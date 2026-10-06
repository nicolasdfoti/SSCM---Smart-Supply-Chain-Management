import { HeroSection } from './Home/components/HeroSection';
import { FeaturesGrid } from './Home/components/FeatureGrid';
import { Timeline } from '../components/ui/Timeline';
import { AboutPreview } from './Home/components/AboutPreview';
import { CTA } from '../components/ui/CTA';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesGrid />
      <Timeline />
      <div className="bg-bg pb-12 lg:pb-16">
        <div className="text-center">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
          >
            Ver servicios en detalle
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      <AboutPreview />
      <CTA
        title="¿Buscás un proveedor para tu negocio?"
        subtitle="Contanos qué necesitás y analizaremos cómo podemos ayudarte a encontrar el contacto adecuado para tu necesidad comercial."
        buttonText="Solicitar asesoramiento"
        href="/contact"
      />
    </>
  );
}