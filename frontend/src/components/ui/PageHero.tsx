import { Reveal } from './Reveal';
import { Container } from './Container';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASSES = {
  sm: 'min-h-[30svh]',
  md: 'min-h-[40svh]',
  lg: 'min-h-[50svh]',
};

export function PageHero({ title, subtitle, image, size = 'md' }: PageHeroProps) {
  return (
    <section
      className={`relative isolate flex items-center overflow-hidden bg-brand ${SIZE_CLASSES[size]}`}
      aria-labelledby="page-hero-title"
    >
      {image && (
        <img
          src={image}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          aria-hidden="true"
        />
      )}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand/95 via-brand/80 to-brand/50 md:from-brand/95 md:via-brand/80 md:to-brand/50"
        aria-hidden="true"
      />
      <Container className="relative z-10 py-12">
        <Reveal>
          <div className="max-w-3xl">
            <h1 id="page-hero-title" className="mb-4 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mx-auto max-w-3xl text-lg text-white/90 sm:text-xl">
                {subtitle}
              </p>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}