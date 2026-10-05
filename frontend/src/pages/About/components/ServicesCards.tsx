import { Reveal } from '../../../components/ui/Reveal';
import { Container } from '../../../components/ui/Container';
import { SectionHeading } from '../../../components/ui/SectionHeading';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Diagnóstico',
    description:
      'Entendemos la necesidad, el contexto y los objetivos de cada cliente para obtener una visión clara del caso.',
  },
  {
    number: '02',
    title: 'Análisis',
    description:
      'Evaluamos los requerimientos para determinar qué tipo de proveedor y alternativa se adapta mejor a la situación.',
  },
  {
    number: '03',
    title: 'Selección',
    description:
      'Utilizamos nuestra experiencia y red de contactos internacionales para identificar proveedores adecuados.',
  },
  {
    number: '04',
    title: 'Conexión',
    description:
      'Facilitamos el vínculo entre el cliente y el proveedor seleccionado para dar inicio a la relación comercial.',
  },
];

export function ServicesCards() {
  return (
    <section className="bg-[#F7FAFC] py-16">
      <Container>
        <SectionHeading
          title="Cómo trabajamos"
          subtitle="Un proceso claro para conectar su empresa con el proveedor adecuado"
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.1} className="group relative rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 text-3xl font-semibold text-[#002840]/20">
                {step.number}
              </div>
              <h3 className="mb-3 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
