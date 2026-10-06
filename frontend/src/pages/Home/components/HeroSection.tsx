import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Container } from '../../../components/ui/Container';

export function HeroSection() {
  return (
    <section
      className="relative isolate flex min-h-[85svh] flex-col items-center justify-center overflow-hidden bg-brand"
      aria-labelledby="hero-title"
    >
      {/* Cuadrícula geométrica de fondo */}
      <div
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]"
        aria-hidden="true"
      />
      
      {/* Resplandor radial para profundidad visual */}
      <div
        className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 opacity-50 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative z-10 py-16 text-center">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          {/* Badge estilo pill-shape */}
          <span className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
            Smart Supply Chain Management
          </span>
          
          <h1
            id="hero-title"
            className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Conectamos tu empresa con{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
              proveedores globales
            </span>
          </h1>
          
          <p className="mb-10 max-w-2xl text-lg text-white/70 sm:text-xl">
            SSCM ayuda a empresas a construir conexiones confiables en la cadena de suministro
            entre China y mercados internacionales.
          </p>
          
          <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
            <Button 
              asChild 
              variant="secondary" 
              size="md" 
              className="h-12 px-8 text-base shadow-[0_0_20px_rgba(37,99,235,0.25)] transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              <Link to="/contact">
                Solicitar asesoramiento
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="ghost" 
              size="md" 
              className="h-12 border border-white/15 bg-white/5 px-8 text-base text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <Link to="/services">
                Ver servicios
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}