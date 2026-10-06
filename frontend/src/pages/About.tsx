import { Reveal } from '../components/ui/Reveal';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTA } from '../components/ui/CTA';
import { SITE } from '../config/site';

export default function About() {
  const { owner } = SITE;
  const showOwner = owner.name && owner.photo;

  return (
    <>
      <section className="relative overflow-hidden bg-brand py-20 text-white sm:py-28">
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Reveal>
              <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Nosotros
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-white/90 sm:text-xl">
                SSCM conecta empresas con proveedores globales mediante experiencia,
                análisis y una red internacional de contactos.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16">
        <Container>
          <Reveal>
            <SectionHeading title="Quién es SSCM" />
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-lg text-muted">
                Smart Supply Chain Management nace para resolver la brecha entre
                empresas que necesitan abastecerse y proveedores confiables en
                mercados internacionales. Combinamos conocimiento de mercado,
                red de contactos verificada y metodología propia para que cada
                conexión sea segura, eficiente y duradera.
              </p>
            </div>
          </Reveal>

          {showOwner && owner.photo && owner.name && (
            <Reveal delay={0.1} className="mt-12">
              <div className="rounded-[var(--radius)] border border-border bg-bg p-8 md:flex md:items-center md:gap-8">
                <div className="shrink-0">
                  <img
                    src={owner.photo}
                    alt={owner.name}
                    className="h-32 w-32 rounded-full object-cover border-4 border-brand"
                  />
                </div>
                <div className="mt-6 text-center md:mt-0 md:text-left">
                  <h3 className="text-xl font-semibold text-heading">{owner.name}</h3>
                  {owner.role && (
                    <p className="mt-1 text-sm text-muted">{owner.role}</p>
                  )}
                  {owner.bio && (
                    <p className="mt-4 text-muted">{owner.bio}</p>
                  )}
                </div>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      <CTA
        title="¿Buscás un proveedor para tu negocio?"
        subtitle="Contanos qué necesitás y analizaremos cómo podemos ayudarte a encontrar el contacto adecuado para tu necesidad comercial."
        buttonText="Solicitar asesoramiento"
        href="/contact"
      />
    </>
  );
}