import { Globe, ShieldCheck, Briefcase } from 'lucide-react';
import { Reveal } from '../../../components/ui/Reveal';
import { Container } from '../../../components/ui/Container';

const FEATURES = [
  {
    title: 'Red Internacional',
    description: 'Acceso directo a fabricantes y proveedores verificados en los principales polos industriales de China y el mundo.',
    icon: Globe,
  },
  {
    title: 'Análisis Riguroso',
    description: 'Evaluación técnica, financiera y legal para minimizar riesgos y asegurar la viabilidad en tu cadena de suministro.',
    icon: ShieldCheck,
  },
  {
    title: 'Gestión Integral',
    description: 'Acompañamiento end-to-end: desde el levantamiento de requisitos hasta la consolidación del acuerdo comercial.',
    icon: Briefcase,
  },
];

export function FeaturesGrid() {
  return (
    <section className="bg-bg py-20">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-surface p-8 shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-md">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-heading">
                  {feature.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}