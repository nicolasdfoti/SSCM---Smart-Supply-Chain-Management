import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../../../components/ui/Reveal';
import { Container } from '../../../components/ui/Container';
import { SectionHeading } from '../../../components/ui/SectionHeading';

export function AboutPreview() {
  return (
    <section className="bg-surface py-16">
      <Container>
        <SectionHeading
          title="Quiénes somos"
          subtitle="SSCM (Smart Supply Chain Management) conecta empresas con proveedores externos mediante experiencia, análisis y una red internacional de contactos."
        />
        <Reveal className="text-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-2"
          >
            Conocé más sobre nosotros
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}