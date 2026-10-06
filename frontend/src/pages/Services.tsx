import { Reveal } from '../components/ui/Reveal';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTA } from '../components/ui/CTA';
import { PageHero } from '../components/ui/PageHero';

const SERVICES = [
  {
    title: 'Búsqueda de proveedores',
    description:
      'Identificamos y evaluamos proveedores potenciales en China y otros mercados internacionales según tus requerimientos técnicos, comerciales y de calidad.',
  },
  {
    title: 'Sourcing y abastecimiento',
    description:
      'Gestionamos el proceso completo de sourcing: desde la definición de especificaciones hasta la negociación de condiciones y el seguimiento de entregas.',
  },
  {
    title: 'Verificación y due diligence',
    description:
      'Realizamos verificaciones de antecedentes, capacidad productiva, certificaciones y cumplimiento normativo para minimizar riesgos en la cadena de suministro.',
  },
  {
    title: 'Gestión de compras internacionales',
    description:
      'Coordinamos logística, documentación aduanera, pagos internacionales y control de calidad para operaciones de importación fluidas y seguras.',
  },
];

export default function Services() {
  return (
    <>
      <PageHero
        title="Servicios"
        subtitle="Soluciones integrales para tu cadena de suministro internacional. Desde la búsqueda de proveedores hasta la gestión completa de compras."
        size="md"
      />

      <section className="bg-surface py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              title="Qué ofrecemos"
              subtitle="Cuatro pilares para que tu abastecimiento internacional sea seguro, eficiente y rentable"
            />
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.1}>
                <article className="rounded-[var(--radius)] border border-border bg-bg p-8 hover:border-brand/50 transition-colors">
                  <h3 className="mb-3 text-lg font-semibold text-heading">{service.title}</h3>
                  <p className="text-muted">{service.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              title="Cómo trabajamos"
              subtitle="Un proceso claro en 4 pasos para conectar tu empresa con el proveedor adecuado"
            />
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { number: '01', title: 'Diagnóstico', desc: 'Entendemos la necesidad, el contexto y los objetivos para definir el alcance del caso.' },
              { number: '02', title: 'Análisis', desc: 'Evaluamos los requerimientos y alternativas para identificar el tipo de proveedor adecuado.' },
              { number: '03', title: 'Selección', desc: 'Identificamos y evaluamos proveedores potenciales utilizando nuestra red de contactos.' },
              { number: '04', title: 'Conexión', desc: 'Facilitamos el primer contacto y el inicio de la relación comercial entre las partes.' },
            ].map((step, index) => (
              <Reveal key={step.number} delay={index * 0.1}>
                <article className="rounded-[var(--radius)] border border-border bg-bg p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand font-semibold text-lg" aria-hidden>
                      {step.number}
                    </span>
                    <h3 className="text-lg font-semibold text-heading">{step.title}</h3>
                  </div>
                  <p className="text-muted">{step.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        title="¿Buscás un proveedor para tu negocio?"
        subtitle="Contanos qué necesitás y analizaremos cómo podemos ayudarte a encontrar el contacto adecuado para tu necesidad comercial."
        buttonText="Solicitar asesoramiento"
        href="/contact"
      />
    </>
  );
}