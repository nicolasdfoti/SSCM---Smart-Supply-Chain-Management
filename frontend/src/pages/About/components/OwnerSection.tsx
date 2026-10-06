import { Reveal } from '../../../components/ui/Reveal';
import { Container } from '../../../components/ui/Container';

export function OwnerSection() {
  return (
    <section className="bg-surface py-16">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="mb-6 text-3xl font-semibold tracking-tight text-heading sm:text-4xl">
              Quién es SSCM
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-muted">
              SSCM (Smart Supply Chain Management) es una empresa dedicada a
              conectar empresas con proveedores externos, aprovechando experiencia
              en Supply Chain Management, conocimiento de mercados internacionales
              y una red consolidada de contactos comerciales.
            </p>
            <p className="text-lg leading-relaxed text-muted">
              A través de un proceso de diagnóstico, análisis y selección,
              facilitamos el vínculo entre clientes y proveedores adecuados para
              generar relaciones comerciales sólidas y confiables.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
