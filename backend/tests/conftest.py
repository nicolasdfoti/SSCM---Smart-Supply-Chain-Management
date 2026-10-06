import pytest
from unittest.mock import MagicMock

from app.core.config import settings


@pytest.fixture(autouse=True)
def mock_settings(monkeypatch):
    monkeypatch.setattr(settings, 'app_env', 'testing')
    monkeypatch.setattr(settings, 'frontend_origin', 'http://localhost:5173')
    monkeypatch.setattr(settings, 'resend_api_key', 'test_key')
    monkeypatch.setattr(settings, 'mail_from', 'test@example.com')
    monkeypatch.setattr(settings, 'lead_notify_email', 'notify@example.com')
    monkeypatch.setattr(settings, 'rate_limit_per_hour', 5)
    yield settings


@pytest.fixture
def mock_limiter():
    from slowapi import Limiter
    limiter = Limiter(key_func=lambda: 'test')
    return limiter