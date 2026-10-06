import { Search, LineChart, Target, Link2 } from 'lucide-react';
import { Reveal } from './Reveal';
import { Container } from './Container';
import { SectionHeading } from './SectionHeading';

const TIMELINE_STEPS = [
  {
    icon: Search,
    title: 'Diagnóstico',
    description: 'Entendemos la necesidad, el contexto y los objetivos para definir el alcance del caso.',
  },
  {
    icon: LineChart,
    title: 'Análisis',
    description: 'Evaluamos los requerimientos y alternativas para identificar el tipo de proveedor adecuado.',
  },
  {
    icon: Target,
    title: 'Selección',
    description: 'Identificamos y evaluamos proveedores potenciales utilizando nuestra red de contactos.',
  },
  {
    icon: Link2,
    title: 'Conexión',
    description: 'Facilitamos el primer contacto y el inicio de la relación comercial entre las partes.',
  },
];

export function Timeline() {
  return (
    <section className="bg-bg py-20 lg:py-24 border-t border-border/50">
      <Container>
        <Reveal>
          <SectionHeading
            title="Cómo trabajamos"
            subtitle="Un proceso estructurado para conectar tu empresa con el proveedor adecuado"
          />
        </Reveal>
        
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TIMELINE_STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.1}>
              <div className="group relative flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-md">
                
                {/* Contenedor del ícono */}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/5 text-brand transition-colors duration-300 group-hover:bg-accent/10 group-hover:text-accent">
                  <step.icon className="h-6 w-6" />
                </div>
                
                {/* Píldora de número sutil (Opcional visual, refuerza el orden sin opacar el ícono) */}
                <span className="absolute right-6 top-6 text-xs font-bold text-muted/30">
                  0{index + 1}
                </span>

                <h3 className="mb-2 text-lg font-semibold text-heading">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
                
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}