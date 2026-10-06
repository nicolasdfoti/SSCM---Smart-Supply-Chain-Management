import { Reveal } from '../../../components/ui/Reveal';
import { CheckCircle } from 'lucide-react';
import { Container } from '../../../components/ui/Container';

const APPROACH_POINTS = [
  'Experiencia en supply chain y comercio internacional',
  'Análisis detallado de cada requerimiento',
  'Red de contactos que permite identificar proveedores adecuados',
  'Enfoque en relaciones comerciales sólidas y confiables',
  'Orientación a resultados prácticos y viables',
];

export function Approach() {
  return (
    <section className="bg-surface py-16">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative h-80 overflow-hidden rounded-[var(--radius)] bg-brand/10 lg:h-96">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-brand)/10,transparent_70%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-lg sm:h-40 sm:w-40">
                <div className="absolute -top-4 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent" />
                <div className="absolute -bottom-4 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent" />
                <div className="absolute -left-4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-brand-2" />
                <div className="absolute -right-4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-brand-2" />
                <div className="absolute left-1/2 top-1/2 h-2 w-16 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-border" />
                <div className="absolute left-1/2 top-1/2 h-2 w-16 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-border" />
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-md">
                  <span className="text-lg font-semibold">SSCM</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="mb-6 text-3xl font-semibold tracking-tight text-heading sm:text-4xl">
              Nuestro enfoque
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-muted">
              SSCM actúa como intermediario especializado para conectar empresas
              con proveedores externos. Basamos nuestro trabajo en experiencia,
              conocimiento de mercados internacionales y una red consolidada de
              contactos comerciales.
            </p>
            <ul className="space-y-4">
              {APPROACH_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle
                    className="mt-1 h-5 w-5 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span className="text-base text-text">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
