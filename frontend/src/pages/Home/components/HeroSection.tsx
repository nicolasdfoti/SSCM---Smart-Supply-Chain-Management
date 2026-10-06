import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Container } from '../../../components/ui/Container';
import heroImage from '../../../assets/images/hero.jpg';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand pb-24 pt-16 lg:pb-32 lg:pt-24">
      <div className="absolute inset-0 opacity-60">
        <img
          src={heroImage}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/95 to-brand/80" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-white/80">
            Smart Supply Chain Management
          </p>
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Connecting Businesses with Global Suppliers
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-white/80 sm:text-xl">
            SSCM helps businesses build reliable supply chain connections across China and international markets.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="secondary" size="md">
              <Link to="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="md" className="border border-white/30 text-white hover:bg-white/10">
              <Link to="/services">
                Our Services
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
