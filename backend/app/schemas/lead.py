from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional
import html


class LeadCreate(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    mensaje: str = Field(..., min_length=10, max_length=5000)
    empresa: Optional[str] = Field(None, max_length=150)
    telefono: Optional[str] = Field(None, max_length=30)
    pais: Optional[str] = Field(None, max_length=100)
    motivo: Optional[str] = Field(None, max_length=100)
    website: Optional[str] = Field(None, max_length=200)

    @field_validator('nombre', 'empresa', 'telefono', 'pais', 'motivo', 'mensaje', mode='before')
    @classmethod
    def escape_html(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        return html.escape(v.strip())

    @field_validator('email', mode='before')
    @classmethod
    def strip_email(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        return v.strip()


class LeadResponse(BaseModel):
    id: str
    status: str