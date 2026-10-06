import { apiFetch } from './api';
import type { LeadFormValues } from '../types/lead';

export interface LeadResponse {
  id: string;
  status: string;
}

export async function sendLead(values: LeadFormValues): Promise<LeadResponse> {
  const payload = {
    nombre: values.nombre,
    empresa: values.empresa ?? null,
    email: values.email,
    telefono: values.telefono ?? null,
    pais: values.pais ?? null,
    motivo: values.motivo ?? null,
    mensaje: values.mensaje,
    website: values.website ?? null,
  };

  return apiFetch<LeadResponse>('/api/leads', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}