import { Reveal } from '../components/ui/Reveal';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTA } from '../components/ui/CTA';
import { PageHero } from '../components/ui/PageHero';
import { ConnectionDiagram } from '../components/ui/ConnectionDiagram';
import { Search, Filter, CheckCircle, Link as LinkIcon, Check } from 'lucide-react';

const STAGES = [
  {
    number: '01',
    title: 'Diagnóstico',
    icon: Search,
    description:
      'Entendemos la necesidad, el contexto y los objetivos de tu empresa para definir el alcance del caso. Analizamos tus requerimientos técnicos, comerciales y de calidad para establecer los criterios de búsqueda.',
    bullets: [
      'Levantamiento de requisitos y especificaciones del producto o servicio buscado',
      'Definición de criterios de calificación: capacidad, certificaciones, cumplimiento normativo',
      'Identificación de mercados objetivo y estrategia de acercamiento',
    ],
  },
  {
    number: '02',
    title: 'Análisis',
    icon: Filter,
    description:
      'Evaluamos los requerimientos y alternativas para identificar el tipo de proveedor adecuado. Cruzamos tu perfil de necesidad con nuestra base de conocimiento de mercados internacionales.',
    bullets: [
      'Mapeo de proveedores potenciales por categoría, geografía y capacidad',
      'Análisis comparativo de ventajas competitivas: costo, lead time, calidad',
      'Evaluación de riesgos: cadena de suministro, regulaciones, estabilidad financiera',
    ],
  },
  {
    number: '03',
    title: 'Selección de proveedores',
    icon: CheckCircle,
    description:
      'Identificamos y evaluamos proveedores potenciales utilizando nuestra red de contactos. Presentamos una shortlist calificada con la información necesaria para tu toma de decisión.',
    bullets: [
      'Validación de capacidades productivas, certificaciones y referencias comerciales',
      'Solicitud y análisis de cotizaciones técnicas y comerciales (RFQ/RFP)',
      'Informe comparativo con recomendación fundamentada por proveedor',
    ],
  },
  {
    number: '04',
    title: 'Conexión',
    icon: LinkIcon,
    description:
      'Facilitamos el primer contacto y el inicio de la relación comercial entre las partes. Acompañamos la negociación, la formalización de acuerdos y el seguimiento inicial.',
    bullets: [
      'Coordinación de reuniones técnicas y comerciales entre comprador y proveedor',
      'Apoyo en negociación de condiciones: precios, plazos, Incoterms, garantías',
      'Seguimiento post-acuerdo: hitos de entrega, control de calidad, escalamiento',
    ],
  },
];

export default function Services() {
  return (
    <>
      <PageHero
        title="Servicios"
        subtitle="SSCM te acompaña en todo el ciclo: desde el diagnóstico de tu necesidad hasta la conexión con el proveedor adecuado en China y mercados internacionales."
        size="md"
      />

      <section className="bg-bg py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              title="Cómo trabajamos"
              subtitle="Cuatro etapas para conectar tu empresa con proveedores globales de forma segura y eficiente"
            />
          </Reveal>

          <div className="mt-16 grid gap-8 lg:gap-12">
            {STAGES.map((stage, index) => (
              <Reveal key={stage.number} delay={index * 0.1}>
                <div className="group relative flex flex-col gap-8 overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md md:p-12 lg:flex-row lg:items-start lg:gap-16">
                  
                  {/* Bloque visual izquierdo */}
                  <div className="flex w-full shrink-0 flex-col lg:w-72">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                      <stage.icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm font-bold text-muted/40">{stage.number}</span>
                      <h2 className="text-2xl font-bold text-heading">{stage.title}</h2>
                    </div>
                  </div>

                  {/* Bloque de contenido derecho */}
                  <div className="flex-1">
                    <p className="mb-8 text-lg leading-relaxed text-muted">
                      {stage.description}
                    </p>
                    <ul className="space-y-4" role="list">
                      {stage.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-4">
                          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/5">
                            <Check className="h-4 w-4 text-brand" aria-hidden="true" />
                          </div>
                          <span className="text-muted">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 lg:py-24 border-t border-border" aria-labelledby="diagram-title">
        <Container>
          <Reveal>
            <h2 id="diagram-title" className="sr-only">Diagrama: Cliente — SSCM — Proveedor</h2>
            <div className="relative w-full overflow-x-auto py-8">
              <ConnectionDiagram variant="wide" />
            </div>
          </Reveal>
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