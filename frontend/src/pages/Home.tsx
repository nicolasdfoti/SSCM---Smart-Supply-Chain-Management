import { HeroSection } from './Home/components/HeroSection';
import { ServicesPreview } from './Home/components/ServicesPreview';
import { AboutPreview } from './Home/components/AboutPreview';
import { CTASection } from './Home/components/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <AboutPreview />
      <CTASection />
    </>
  );
}
