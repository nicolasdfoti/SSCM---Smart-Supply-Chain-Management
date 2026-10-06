import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.fixture
async def async_client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        yield client


class TestHealthCheck:
    async def test_health_check(self, async_client: AsyncClient):
        response = await async_client.get('/health')
        assert response.status_code == 200
        assert response.json() == {'status': 'ok'}


class TestCreateLead:
    VALID_LEAD = {
        'nombre': 'Juan Pérez',
        'email': 'juan@example.com',
        'mensaje': 'Necesito proveedores de textiles en China para mi empresa.',
        'empresa': 'Textiles SA',
        'telefono': '+54 11 1234 5678',
        'pais': 'Argentina',
        'motivo': 'búsqueda de proveedores',
    }

    async def test_create_lead_success(self, async_client: AsyncClient, mocker):
        mock_send = mocker.patch('app.routers.leads.send_lead_notification')

        response = await async_client.post('/api/leads', json=self.VALID_LEAD)

        assert response.status_code == 201
        data = response.json()
        assert 'id' in data
        assert data['status'] == 'received'
        mock_send.assert_awaited_once()

    async def test_create_lead_honeypot_ignored(self, async_client: AsyncClient, mocker):
        mock_send = mocker.patch('app.routers.leads.send_lead_notification')
        lead_with_honeypot = {**self.VALID_LEAD, 'website': 'http://spam.com'}

        response = await async_client.post('/api/leads', json=lead_with_honeypot)

        assert response.status_code == 201
        data = response.json()
        assert data['status'] == 'received'
        mock_send.assert_not_called()

    async def test_create_lead_honeypot_empty_string_allowed(self, async_client: AsyncClient, mocker):
        mock_send = mocker.patch('app.routers.leads.send_lead_notification')
        lead_empty_honeypot = {**self.VALID_LEAD, 'website': ''}

        response = await async_client.post('/api/leads', json=lead_empty_honeypot)

        assert response.status_code == 201
        mock_send.assert_awaited_once()

    async def test_create_lead_honeypot_whitespace_ignored(self, async_client: AsyncClient, mocker):
        mock_send = mocker.patch('app.routers.leads.send_lead_notification')
        lead_whitespace_honeypot = {**self.VALID_LEAD, 'website': '   '}

        response = await async_client.post('/api/leads', json=lead_whitespace_honeypot)

        assert response.status_code == 201
        mock_send.assert_not_called()

    async def test_create_lead_missing_nombre(self, async_client: AsyncClient):
        lead = {**self.VALID_LEAD}
        del lead['nombre']

        response = await async_client.post('/api/leads', json=lead)

        assert response.status_code == 422

    async def test_create_lead_missing_email(self, async_client: AsyncClient):
        lead = {**self.VALID_LEAD}
        del lead['email']

        response = await async_client.post('/api/leads', json=lead)

        assert response.status_code == 422

    async def test_create_lead_invalid_email(self, async_client: AsyncClient):
        lead = {**self.VALID_LEAD, 'email': 'no-es-email'}

        response = await async_client.post('/api/leads', json=lead)

        assert response.status_code == 422

    async def test_create_lead_missing_mensaje(self, async_client: AsyncClient):
        lead = {**self.VALID_LEAD}
        del lead['mensaje']

        response = await async_client.post('/api/leads', json=lead)

        assert response.status_code == 422

    async def test_create_lead_mensaje_too_short(self, async_client: AsyncClient):
        lead = {**self.VALID_LEAD, 'mensaje': 'Corto'}

        response = await async_client.post('/api/leads', json=lead)

        assert response.status_code == 422

    async def test_create_lead_mensaje_too_long(self, async_client: AsyncClient):
        lead = {**self.VALID_LEAD, 'mensaje': 'a' * 5001}

        response = await async_client.post('/api/leads', json=lead)

        assert response.status_code == 422

    async def test_create_lead_optional_fields_max_length(self, async_client: AsyncClient, mocker):
        mock_send = mocker.patch('app.routers.leads.send_lead_notification')
        lead = {
            **self.VALID_LEAD,
            'empresa': 'a' * 151,
            'telefono': 'a' * 31,
            'pais': 'a' * 101,
            'motivo': 'a' * 101,
        }

        response = await async_client.post('/api/leads', json=lead)

        assert response.status_code == 422

    async def test_create_lead_resend_failure_returns_502(self, async_client: AsyncClient, mocker):
        mocker.patch(
            'app.routers.leads.send_lead_notification',
            side_effect=Exception('Resend API error'),
        )

        response = await async_client.post('/api/leads', json=self.VALID_LEAD)

        assert response.status_code == 502
        assert 'No se pudo procesar la solicitud' in response.json()['detail']

    async def test_create_lead_html_escaped(self, async_client: AsyncClient, mocker):
        mock_send = mocker.patch('app.routers.leads.send_lead_notification')
        lead = {
            **self.VALID_LEAD,
            'nombre': '<script>alert(1)</script>',
            'mensaje': 'Mensaje con <b>HTML</b> y & entidades',
        }

        response = await async_client.post('/api/leads', json=lead)

        assert response.status_code == 201
        call_args = mock_send.call_args
        assert '<script>' not in call_args.kwargs['nombre']
        assert '<script>' in call_args.kwargs['nombre']
        assert '<b>' not in call_args.kwargs['mensaje']
        assert '<b>' in call_args.kwargs['mensaje']


class TestRateLimit:
    async def test_rate_limit_exceeded(self, async_client: AsyncClient, mocker):
        mocker.patch('app.routers.leads.send_lead_notification')
        lead = self.VALID_LEAD.copy()

        for i in range(5):
            response = await async_client.post('/api/leads', json={**lead, 'email': f'user{i}@example.com'})
            assert response.status_code == 201

        response = await async_client.post('/api/leads', json={**lead, 'email': 'user5@example.com'})
        assert response.status_code == 429