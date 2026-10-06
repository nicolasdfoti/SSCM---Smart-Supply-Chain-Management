import { useState } from 'react';
import { Reveal } from '../../../components/ui/Reveal';
import { Container } from '../../../components/ui/Container';
import { Button } from '../../../components/ui/Button';

interface FormData {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  pais: string;
  motivo: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  empresa?: string;
  email?: string;
  telefono?: string;
  pais?: string;
  motivo?: string;
  mensaje?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    pais: '',
    motivo: '',
    mensaje: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.empresa.trim()) {
      newErrors.empresa = 'La empresa es obligatoria';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const inputBase = 'w-full rounded-[var(--radius)] border px-4 py-3 text-heading placeholder-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10';
  const inputError = 'border-red-500';
  const inputDefault = 'border-border';

  return (
    <section className="bg-bg py-16">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-heading sm:text-4xl">
                Enviá tu consulta
              </h2>
              <p className="mt-4 text-lg text-muted">
                Completá el formulario y nos pondremos en contacto con vos lo
                antes posible.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-[var(--radius)] border border-green-200 bg-green-50 p-8 text-center">
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
                    />
                    {errors.nombre && (
                      <p className="mt-2 text-sm text-red-600">{errors.nombre}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="empresa"
                      className="mb-2 block text-sm font-medium text-heading"
                    >
                      Empresa *
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.empresa ? inputError : inputDefault}`}
                      placeholder="Nombre de tu empresa"
                      aria-invalid={errors.empresa ? 'true' : 'false'}
                    />
                    {errors.empresa && (
                      <p className="mt-2 text-sm text-red-600">{errors.empresa}</p>
                    )}
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
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email}</p>
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
                      <option value="">Seleccioná un motivo</option>
                      <option value="búsqueda de proveedores">
                        Búsqueda de proveedores
                      </option>
                      <option value="necesidad de sourcing">
                        Necesidad de sourcing
                      </option>
                      <option value="consulta general">Consulta general</option>
                      <option value="otro">Otro</option>
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
                  />
                  {errors.mensaje && (
                    <p className="mt-2 text-sm text-red-600">{errors.mensaje}</p>
                  )}
                </div>

                <div className="mt-8 flex justify-center">
                  <Button type="submit" variant="primary" size="md">
                    Enviar consulta
                  </Button>
                </div>

                <p className="mt-6 text-center text-sm text-muted">
                  * Campos obligatorios.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
