import { HeroSection } from './Home/components/HeroSection';
import { Timeline } from '../components/ui/Timeline';
import { AboutPreview } from './Home/components/AboutPreview';
import { CTA } from '../components/ui/CTA';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Timeline />
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