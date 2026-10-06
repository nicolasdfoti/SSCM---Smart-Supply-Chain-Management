import uuid
import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.config import settings
from app.schemas.lead import LeadCreate, LeadResponse
from app.services.email import send_lead_notification, EmailServiceError

logger = logging.getLogger(__name__)

limiter = Limiter(key_func=get_remote_address)

router = APIRouter(prefix='/api/leads', tags=['leads'])


def get_limiter() -> Limiter:
    return limiter


@router.post(
    '',
    response_model=LeadResponse,
    status_code=status.HTTP_201_CREATED,
    summary='Crear una nueva consulta de lead',
    responses={
        201: {'description': 'Lead creado y notificación enviada'},
        400: {'description': 'Datos de entrada inválidos'},
        422: {'description': 'Error de validación'},
        429: {'description': 'Demasiadas solicitudes'},
        502: {'description': 'Error al enviar notificación por email'},
    },
)
async def create_lead(
    request: Request,
    lead_data: LeadCreate,
    limiter_dep: Limiter = Depends(get_limiter),
) -> LeadResponse:
    if lead_data.website and lead_data.website.strip():
        logger.info('Honeypot triggered, ignoring lead submission')
        return LeadResponse(id=str(uuid.uuid4()), status='received')

    try:
        await send_lead_notification(
            nombre=lead_data.nombre,
            email=lead_data.email,
            mensaje=lead_data.mensaje,
            empresa=lead_data.empresa,
            telefono=lead_data.telefono,
            pais=lead_data.pais,
            motivo=lead_data.motivo,
        )
    except EmailServiceError:
        logger.exception('Failed to send lead notification email')
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail='No se pudo procesar la solicitud en este momento. Intente nuevamente más tarde.',
        )

    lead_id = str(uuid.uuid4())
    logger.info('Lead created: id=%s email=%s', lead_id, lead_data.email)

    return LeadResponse(id=lead_id, status='received')


@router.get('/health', include_in_schema=False)
async def health_check() -> dict:
    return {'status': 'ok'}