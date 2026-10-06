import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.core.config import settings
from app.routers import leads

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)

limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info('Application starting up')
    yield
    logger.info('Application shutting down')


app = FastAPI(
    title='SSCM API',
    description='Smart Supply Chain Management - Lead Management API',
    version='0.1.0',
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=['GET', 'POST'],
    allow_headers=['*'],
)

app.include_router(leads.router)


@app.get('/health', tags=['health'])
async def health_check() -> dict:
    return {'status': 'ok'}


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception('Unhandled exception: %s', exc)
    return JSONResponse(
        status_code=500,
        content={'detail': 'Error interno del servidor'},
    )