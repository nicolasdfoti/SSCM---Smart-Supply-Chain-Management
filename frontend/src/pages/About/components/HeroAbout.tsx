import { Reveal } from '../../../components/ui/Reveal';
import { Container } from '../../../components/ui/Container';

export function HeroAbout() {
  return (
    <section className="relative overflow-hidden bg-brand py-20 text-white sm:py-28">
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <Reveal>
            <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Nosotros
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/90 sm:text-xl">
            Conectamos empresas con los proveedores adecuados a través de
            experiencia, análisis y una red de contactos internacionales.
          </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}