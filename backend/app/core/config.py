from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file='.env',
        env_file_encoding='utf-8',
        extra='ignore',
    )

    app_env: str = 'development'
    frontend_origin: str = 'http://localhost:5173'

    resend_api_key: str | None = None
    mail_from: str | None = None
    lead_notify_email: str | None = None

    rate_limit_per_hour: int = 5


settings = Settings()