import { Reveal } from '../../../components/ui/Reveal';
import { Container } from '../../../components/ui/Container';

export function HeroContact() {
  return (
    <section className="relative overflow-hidden bg-[#002840] py-20 text-white sm:py-28">
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <Reveal>
            <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Contacto
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/90 sm:text-xl">
              Contanos qué necesitás y analizaremos cómo podemos ayudarte a
              encontrar el contacto adecuado para tu necesidad comercial.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
