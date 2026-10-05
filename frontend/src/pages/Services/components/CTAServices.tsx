import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../../../components/ui/Reveal';
import { Button } from '../../../components/ui/Button';
import { Container } from '../../../components/ui/Container';

export function CTAServices() {
  return (
    <section className="bg-[#002840] py-16">
      <Container>
        <Reveal className="text-center">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            ¿Buscás un proveedor para tu negocio?
          </h2>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/90 sm:text-xl">
            Contanos qué necesitás y analizaremos cómo podemos ayudarte a
            encontrar el contacto adecuado para tu necesidad comercial.
          </p>
          <Button asChild variant="secondary" size="md">
            <Link to="/contact">
              Solicitar asesoramiento
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
