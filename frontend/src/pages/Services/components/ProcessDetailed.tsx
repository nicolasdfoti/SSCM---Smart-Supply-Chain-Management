import { Reveal } from '../../../components/ui/Reveal';
import { Container } from '../../../components/ui/Container';
import { SectionHeading } from '../../../components/ui/SectionHeading';

const PROCESS_STEPS = [
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

export function ProcessDetailed() {
  return (
    <section className="bg-bg py-16">
      <Container>
        <SectionHeading
          title="Nuestro proceso"
          subtitle="Un enfoque metodológico para conectar tu empresa con el proveedor adecuado"
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal
              key={step.number}
              delay={index * 0.1}
              className="relative rounded-[var(--radius)] border border-border bg-surface p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 text-3xl font-semibold text-brand/20">
                {step.number}
              </div>
              <h3 className="mb-3 text-lg font-semibold text-heading">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
