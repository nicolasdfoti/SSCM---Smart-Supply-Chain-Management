import logging
from typing import Optional
import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)


class EmailServiceError(Exception):
    pass


async def send_lead_notification(
    *,
    nombre: str,
    email: str,
    mensaje: str,
    empresa: Optional[str] = None,
    telefono: Optional[str] = None,
    pais: Optional[str] = None,
    motivo: Optional[str] = None,
) -> None:
    if not settings.resend_api_key or not settings.mail_from or not settings.lead_notify_email:
        logger.warning('Email service not configured, skipping notification')
        return

    subject = f'Nueva consulta de {nombre} - SSCM'
    body_lines = [
        f'Nombre: {nombre}',
        f'Email: {email}',
    ]
    if empresa:
        body_lines.append(f'Empresa: {empresa}')
    if telefono:
        body_lines.append(f'Teléfono: {telefono}')
    if pais:
        body_lines.append(f'País: {pais}')
    if motivo:
        body_lines.append(f'Motivo: {motivo}')
    body_lines.append('')
    body_lines.append('Mensaje:')
    body_lines.append(mensaje)

    text_body = '\n'.join(body_lines)

    html_lines = [
        '<html><body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #334155;">',
        f'<h2 style="color: #002840;">Nueva consulta de <strong>{nombre}</strong></h2>',
        f'<p><strong>Email:</strong> {email}</p>',
    ]
    if empresa:
        html_lines.append(f'<p><strong>Empresa:</strong> {empresa}</p>')
    if telefono:
        html_lines.append(f'<p><strong>Teléfono:</strong> {telefono}</p>')
    if pais:
        html_lines.append(f'<p><strong>País:</strong> {pais}</p>')
    if motivo:
        html_lines.append(f'<p><strong>Motivo:</strong> {motivo}</p>')
    html_lines.append('<p><strong>Mensaje:</strong></p>')
    html_lines.append(f'<p style="white-space: pre-wrap;">{mensaje}</p>')
    html_lines.append('</body></html>')
    html_body = '\n'.join(html_lines)

    payload = {
        'from': settings.mail_from,
        'to': [settings.lead_notify_email],
        'reply_to': email,
        'subject': subject,
        'text': text_body,
        'html': html_body,
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                'https://api.resend.com/emails',
                headers={
                    'Authorization': f'Bearer {settings.resend_api_key}',
                    'Content-Type': 'application/json',
                },
                json=payload,
            )
            response.raise_for_status()
    except httpx.HTTPStatusError as e:
        logger.error(
            'Resend API error: status=%s',
            e.response.status_code,
            extra={'resend_response': e.response.text},
        )
        raise EmailServiceError('No se pudo enviar la notificación por email') from e
    except httpx.RequestError as e:
        logger.error('Resend request error: %s', type(e).__name__)
        raise EmailServiceError('No se pudo enviar la notificación por email') from e