import pytest
from unittest.mock import AsyncMock, patch

from app.services.email import send_lead_notification, EmailServiceError


class TestSendLeadNotification:
    @pytest.fixture
    def valid_lead_data(self):
        return {
            'nombre': 'Juan Pérez',
            'email': 'juan@example.com',
            'mensaje': 'Necesito proveedores de textiles en China.',
            'empresa': 'Textiles SA',
            'telefono': '+54 11 1234 5678',
            'pais': 'Argentina',
            'motivo': 'búsqueda de proveedores',
        }

    @pytest.mark.asyncio
    async def test_send_lead_notification_not_configured(self, valid_lead_data, monkeypatch):
        monkeypatch.setattr('app.services.email.settings.resend_api_key', None)
        monkeypatch.setattr('app.services.email.settings.mail_from', None)
        monkeypatch.setattr('app.services.email.settings.lead_notify_email', None)

        await send_lead_notification(**valid_lead_data)

    @pytest.mark.asyncio
    async def test_send_lead_notification_success(self, valid_lead_data, monkeypatch):
        monkeypatch.setattr('app.services.email.settings.resend_api_key', 'test_key')
        monkeypatch.setattr('app.services.email.settings.mail_from', 'test@example.com')
        monkeypatch.setattr('app.services.email.settings.lead_notify_email', 'notify@example.com')

        mock_post = AsyncMock()
        mock_post.return_value.__aenter__.return_value.status_code = 200
        mock_post.return_value.__aenter__.return_value.raise_for_status = AsyncMock()

        with patch('httpx.AsyncClient.post', mock_post):
            await send_lead_notification(**valid_lead_data)

        mock_post.assert_called_once()
        call_args = mock_post.call_args
        assert call_args.kwargs['json']['from'] == 'test@example.com'
        assert call_args.kwargs['json']['to'] == ['notify@example.com']
        assert call_args.kwargs['json']['reply_to'] == 'juan@example.com'
        assert 'Juan Pérez' in call_args.kwargs['json']['subject']

    @pytest.mark.asyncio
    async def test_send_lead_notification_resend_http_error(self, valid_lead_data, monkeypatch):
        import httpx
        monkeypatch.setattr('app.services.email.settings.resend_api_key', 'test_key')
        monkeypatch.setattr('app.services.email.settings.mail_from', 'test@example.com')
        monkeypatch.setattr('app.services.email.settings.lead_notify_email', 'notify@example.com')

        mock_response = AsyncMock()
        mock_response.status_code = 400
        mock_response.text = 'Bad Request'

        mock_post = AsyncMock()
        mock_post.return_value.__aenter__.return_value = mock_response
        mock_post.return_value.__aenter__.return_value.raise_for_status.side_effect = (
            httpx.HTTPStatusError('400 Bad Request', request=AsyncMock(), response=mock_response)
        )

        with patch('httpx.AsyncClient.post', mock_post):
            with pytest.raises(EmailServiceError, match='No se pudo enviar la notificación'):
                await send_lead_notification(**valid_lead_data)

    @pytest.mark.asyncio
    async def test_send_lead_notification_request_error(self, valid_lead_data, monkeypatch):
        import httpx
        monkeypatch.setattr('app.services.email.settings.resend_api_key', 'test_key')
        monkeypatch.setattr('app.services.email.settings.mail_from', 'test@example.com')
        monkeypatch.setattr('app.services.email.settings.lead_notify_email', 'notify@example.com')

        mock_post = AsyncMock()
        mock_post.side_effect = httpx.RequestError('Connection error')

        with patch('httpx.AsyncClient.post', mock_post):
            with pytest.raises(EmailServiceError, match='No se pudo enviar la notificación'):
                await send_lead_notification(**valid_lead_data)