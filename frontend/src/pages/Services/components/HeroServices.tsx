import { Reveal } from '../../../components/ui/Reveal';
import { Container } from '../../../components/ui/Container';

export function HeroServices() {
    return (
    <section className="bg-[#002840] py-20">
      <Container>
        <Reveal className="text-center">
          <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Servicios
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-white/90 sm:text-xl">
            Facilitamos la conexión entre empresas y proveedores adecuados,
            basándonos en experiencia, análisis y una red de contactos
            internacionales.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
