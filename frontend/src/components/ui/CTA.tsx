import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { Button } from './Button';
import { Container } from './Container';

interface CTAProps {
  title: string;
  subtitle: string;
  buttonText: string;
  href: string;
  variant?: 'primary' | 'secondary';
  centered?: boolean;
}

export function CTA({
  title,
  subtitle,
  buttonText,
  href,
  variant = 'secondary',
  centered = true,
}: CTAProps) {
  return (
    <section className="bg-brand py-16">
      <Container>
        <Reveal className={centered ? 'text-center' : ''}>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/90 sm:text-xl">
            {subtitle}
          </p>
          <Button asChild variant={variant} size="md">
            <Link to={href}>
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}