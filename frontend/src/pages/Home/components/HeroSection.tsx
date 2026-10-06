import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Container } from '../../../components/ui/Container';

export function HeroSection() {
  return (
    <section
      className="relative isolate flex min-h-[85svh] items-center overflow-hidden bg-brand"
      aria-labelledby="hero-title"
    >
      <img
        src="/hero-bg.jpg"
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-brand/85 md:bg-gradient-to-r md:from-brand/95 md:via-brand/80 md:to-brand/50"
        aria-hidden="true"
      />
      <Container className="relative z-10 py-16">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-white/80">
            Smart Supply Chain Management
          </p>
          <h1
            id="hero-title"
            className="mb-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Conectamos tu empresa con proveedores globales
          </h1>
          <p className="mb-10 max-w-xl text-lg text-white/80 sm:text-xl">
            SSCM ayuda a empresas a construir conexiones confiables en la cadena de suministro
            entre China y mercados internacionales.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="secondary" size="md">
              <Link to="/contact">
                Solicitar asesoramiento
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="md" className="border border-white/30 text-white hover:bg-white/10">
              <Link to="/services">
                Ver servicios
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}