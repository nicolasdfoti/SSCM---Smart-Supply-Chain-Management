import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../../../components/ui/Reveal';
import { Container } from '../../../components/ui/Container';

export function AboutPreview() {
  return (
    <section className="bg-bg py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-8 shadow-sm md:p-12 lg:p-16">
            {/* Detalle de iluminación sutil en la esquina */}
            <div 
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-[80px]" 
              aria-hidden="true" 
            />
            
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
                Expertos en <span className="text-accent">conexiones comerciales</span>
              </h2>
              
              <p className="mb-10 text-lg text-muted md:text-xl">
                SSCM (Smart Supply Chain Management) conecta empresas con proveedores externos mediante experiencia, análisis riguroso y una red internacional de contactos.
              </p>
              
              {/* Transformamos el link de texto en un botón estructurado */}
              <Link
                to="/about"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand px-6 text-sm font-medium text-white transition-all hover:bg-brand-2 hover:shadow-md"
              >
                Conocé más sobre nosotros
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}