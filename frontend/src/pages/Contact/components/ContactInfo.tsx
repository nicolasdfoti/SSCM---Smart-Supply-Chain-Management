import { Reveal } from '../../../components/ui/Reveal';
import { Container } from '../../../components/ui/Container';
import { SectionHeading } from '../../../components/ui/SectionHeading';

export function ContactInfo() {
    return (
    <section className="bg-white py-16">
      <Container>
        <Reveal>
          <SectionHeading
            title="¿Listo para comenzar?"
            subtitle="Contanos qué necesitás y analizaremos cómo podemos ayudarte a encontrar el proveedor adecuado"
          />
        </Reveal>
      </Container>
    </section>
  );
}
