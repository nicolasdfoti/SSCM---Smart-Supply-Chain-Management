import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Container } from '../../../components/ui/Container';

export function CTASection() {
  return (
    <section className="bg-brand py-16">
      <Container>
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-semibold text-white sm:text-4xl">
            Ready to Strengthen Your Supply Chain?
          </h2>
          <p className="mb-8 text-lg text-white/80">
            Let us help you connect with the right partners for your business needs.
          </p>
          <Button asChild variant="secondary" size="md">
            <Link to="/contact">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
