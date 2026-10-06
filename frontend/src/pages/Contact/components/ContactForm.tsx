import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react';
import { Reveal } from '../../../components/ui/Reveal';
import { Container } from '../../../components/ui/Container';
import { Button } from '../../../components/ui/Button';
import { SITE } from '../../../config/site';
import { sendLead } from '../../../services/leads.service';
import type { LeadFormValues } from '../../../types/lead';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormErrors {
  nombre?: string;
  email?: string;
  mensaje?: string;
}

const MOTIVOS = [
  { value: '', label: 'Seleccioná un motivo' },
  { value: 'búsqueda de proveedores', label: 'Búsqueda de proveedores' },
  { value: 'necesidad de sourcing', label: 'Necesidad de sourcing' },
  { value: 'consulta general', label: 'Consulta general' },
  { value: 'otro', label: 'Otro' },
] as const;

export function ContactForm() {
  const [formData, setFormData] = useState<LeadFormValues>({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    pais: '',
    motivo: '',
    mensaje: '',
    website: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const nombreRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const mensajeRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const focusFirstError = useCallback(() => {
    if (errors.nombre) nombreRef.current?.focus();
    else if (errors.email) emailRef.current?.focus();
    else if (errors.mensaje) mensajeRef.current?.focus();
  }, [errors]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      focusFirstError();
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await sendLead(formData);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      const msg = err instanceof Error ? err.message : 'Error al enviar la consulta';
      setErrorMessage(msg);
      focusFirstError();
    }
  };

  useEffect(() => {
    if (status === 'error') {
      focusFirstError();
    }
  }, [status, focusFirstError]);

  const inputBase = 'w-full rounded-[var(--radius)] border px-4 py-3 text-heading placeholder-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10';
  const inputError = 'border-red-500';
  const inputDefault = 'border-border';

  const showChannels = SITE.email || SITE.phone || SITE.whatsapp || SITE.linkedin;

  return (
    <section className="bg-bg py-16">
      <Container>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="lg:pr-8">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-heading sm:text-4xl">
                Enviá tu consulta
              </h2>
              <p className="mb-8 text-lg text-muted">
                Completá el formulario y nos pondremos en contacto con vos lo
                antes posible.
              </p>

              {showChannels && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-heading">Canales directos</h2>
                  <dl className="space-y-3 text-muted">
                    {SITE.email && (
                      <div className="flex items-center gap-3">
                        <dt className="shrink-0 text-sm font-medium text-heading">Email</dt>
                        <dd>
                          <a
                            href={`mailto:${SITE.email}`}
                            className="text-brand hover:underline"
                          >
                            {SITE.email}
                          </a>
                        </dd>
                      </div>
                    )}
                    {SITE.phone && (
                      <div className="flex items-center gap-3">
                        <dt className="shrink-0 text-sm font-medium text-heading">Teléfono</dt>
                        <dd>
                          <a
                            href={`tel:${SITE.phone}`}
                            className="text-brand hover:underline"
                          >
                            {SITE.phone}
                          </a>
                        </dd>
                      </div>
                    )}
                    {SITE.whatsapp && (
                      <div className="flex items-center gap-3">
                        <dt className="shrink-0 text-sm font-medium text-heading">WhatsApp</dt>
                        <dd>
                          <a
                            href={`https://wa.me/${String(SITE.whatsapp).replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand hover:underline"
                          >
                            {SITE.whatsapp}
                          </a>
                        </dd>
                      </div>
                    )}
                    {SITE.linkedin && (
                      <div className="flex items-center gap-3">
                        <dt className="shrink-0 text-sm font-medium text-heading">LinkedIn</dt>
                        <dd>
                          <a
                            href={SITE.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand hover:underline"
                          >
                            {SITE.linkedin}
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>

            <div>
              {status === 'success' ? (
                <div
                  ref={statusRef}
                  role="status"
                  aria-live="polite"
                  className="rounded-[var(--radius)] border border-green-200 bg-green-50 p-8 text-center"
                >
                  <h3 className="mb-2 text-xl font-semibold text-green-900">
                    Consulta enviada
                  </h3>
                  <p className="text-green-800">
                    Gracias por tu consulta. Nos pondremos en contacto con vos lo
                    antes posible.
                  </p>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="rounded-[var(--radius)] border border-border bg-surface p-8 shadow-sm"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="nombre"
                        className="mb-2 block text-sm font-medium text-heading"
                      >
                        Nombre *
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={`${inputBase} ${errors.nombre ? inputError : inputDefault}`}
                        placeholder="Ingresa tu nombre"
                        aria-invalid={errors.nombre ? 'true' : 'false'}
                        aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                        autoComplete="name"
                        ref={nombreRef}
                      />
                      {errors.nombre && (
                        <p
                          id="nombre-error"
                          className="mt-2 text-sm text-red-600"
                          role="alert"
                        >
                          {errors.nombre}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="empresa"
                        className="mb-2 block text-sm font-medium text-heading"
                      >
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className={inputBase}
                        placeholder="Nombre de tu empresa"
                        autoComplete="organization"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-heading"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`${inputBase} ${errors.email ? inputError : inputDefault}`}
                        placeholder="correo@ejemplo.com"
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        autoComplete="email"
                        ref={emailRef}
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="mt-2 text-sm text-red-600"
                          role="alert"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="telefono"
                        className="mb-2 block text-sm font-medium text-heading"
                      >
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className={inputBase}
                        placeholder="+00 000 000 0000"
                        autoComplete="tel"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="pais"
                        className="mb-2 block text-sm font-medium text-heading"
                      >
                        País
                      </label>
                      <input
                        type="text"
                        id="pais"
                        name="pais"
                        value={formData.pais}
                        onChange={handleChange}
                        className={inputBase}
                        placeholder="País"
                        autoComplete="country-name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="motivo"
                        className="mb-2 block text-sm font-medium text-heading"
                      >
                        Motivo de consulta
                      </label>
                      <select
                        id="motivo"
                        name="motivo"
                        value={formData.motivo}
                        onChange={handleChange}
                        className={inputBase}
                      >
                        {MOTIVOS.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="mensaje"
                      className="mb-2 block text-sm font-medium text-heading"
                    >
                      Mensaje *
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={6}
                      value={formData.mensaje}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.mensaje ? inputError : inputDefault}`}
                      placeholder="Describí brevemente tu necesidad comercial..."
                      aria-invalid={errors.mensaje ? 'true' : 'false'}
                      aria-describedby={errors.mensaje ? 'mensaje-error' : undefined}
                      ref={mensajeRef}
                    />
                    {errors.mensaje && (
                      <p
                        id="mensaje-error"
                        className="mt-2 text-sm text-red-600"
                        role="alert"
                      >
                        {errors.mensaje}
                      </p>
                    )}
                  </div>

                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-9999px h-1px w-1px overflow-hidden"
                  />

                  {status === 'error' && (
                    <div
                      ref={statusRef}
                      role="status"
                      aria-live="assertive"
                      className="mt-6 rounded-[var(--radius)] border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                    >
                      <p className="font-semibold">No se pudo enviar la consulta</p>
                      <p className="mt-1">{errorMessage}</p>
                      {SITE.email && (
                        <p className="mt-3">
                          Podés escribirnos directamente a{' '}
                          <a
                            href={`mailto:${SITE.email}`}
                            className="font-medium text-brand hover:underline"
                          >
                            {SITE.email}
                          </a>
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-8 flex justify-center">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? 'Enviando...' : 'Enviar consulta'}
                    </Button>
                  </div>

                  <p className="mt-6 text-center text-sm text-muted">
                    * Campos obligatorios.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}