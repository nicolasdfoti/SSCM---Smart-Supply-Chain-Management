import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Container } from '../../../components/ui/Container';

export function HeroSection() {
  return (
    <section className="bg-brand pb-24 pt-16 lg:pb-32 lg:pt-24">
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-white/80">
              Smart Supply Chain Management
            </p>
            <h1 className="mb-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Conectamos tu empresa con proveedores globales
            </h1>
            <p className="mb-10 max-w-xl text-lg text-white/80 sm:text-xl">
              SSCM ayuda a empresas a construir conexiones confiables en la cadena de suministro
              entre China y mercados internacionales.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild variant="secondary" size="md">
                <Link to="/contact">
                  Contactanos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="md" className="border border-white/30 text-white hover:bg-white/10">
                <Link to="/about">
                  Conocé cómo trabajamos
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative lg:ml-auto" aria-hidden>
            <svg
              viewBox="0 0 400 280"
              className="w-full max-w-md h-auto mx-auto lg:max-w-lg"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Diagrama: Cliente conecta con Proveedor a través de SSCM"
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                </marker>
              </defs>
              <line
                x1="60"
                y1="140"
                x2="160"
                y2="140"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 4"
                markerEnd="url(#arrowhead)"
                className="text-white/60"
              />
              <line
                x1="240"
                y1="140"
                x2="340"
                y2="140"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 4"
                markerEnd="url(#arrowhead)"
                className="text-white/60"
              />
              <circle cx="110" cy="140" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40" />
              <circle cx="290" cy="140" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40" />
              <circle cx="200" cy="140" r="50" fill="var(--color-brand)" stroke="currentColor" strokeWidth="2" className="text-white" />
              <text x="110" y="130" textAnchor="middle" fill="currentColor" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="600" className="text-white/80">Cliente</text>
              <text x="200" y="135" textAnchor="middle" fill="white" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="700" letterSpacing="1">SSCM</text>
              <text x="290" y="130" textAnchor="middle" fill="currentColor" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="600" className="text-white/80">Proveedor</text>
            </svg>
          </div>
        </div>
      </Container>
    </section>
  );
}