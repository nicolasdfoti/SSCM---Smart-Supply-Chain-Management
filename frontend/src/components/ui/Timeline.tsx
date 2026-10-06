import { Reveal } from './Reveal';
import { Container } from './Container';
import { SectionHeading } from './SectionHeading';

const TIMELINE_STEPS = [
  {
    number: '01',
    title: 'Diagnóstico',
    description:
      'Entendemos la necesidad, el contexto y los objetivos para definir el alcance del caso.',
  },
  {
    number: '02',
    title: 'Análisis',
    description:
      'Evaluamos los requerimientos y alternativas para identificar el tipo de proveedor adecuado.',
  },
  {
    number: '03',
    title: 'Selección',
    description:
      'Identificamos y evaluamos proveedores potenciales utilizando nuestra red de contactos.',
  },
  {
    number: '04',
    title: 'Conexión',
    description:
      'Facilitamos el primer contacto y el inicio de la relación comercial entre las partes.',
  },
];

export function Timeline() {
  return (
    <section className="bg-bg py-16">
      <Container>
        <SectionHeading
          title="Cómo trabajamos"
          subtitle="Un proceso claro para conectar tu empresa con el proveedor adecuado"
        />
        <div className="relative">
          <div className="lg:hidden flex flex-col gap-8">
            {TIMELINE_STEPS.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white font-semibold text-lg" aria-hidden>
                    {step.number}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-semibold text-heading">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-start lg:justify-between">
            <div className="relative flex-1" aria-hidden>
              <div className="absolute top-[30px] left-0 right-0 h-0.5 bg-border" />
            </div>
            {TIMELINE_STEPS.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.1}>
                <div className="relative flex flex-col items-center flex-1 px-2">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white font-semibold text-lg z-10" aria-hidden>
                    {step.number}
                  </div>
                  <div className="mt-6 w-full text-center">
                    <h3 className="text-lg font-semibold text-heading">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}