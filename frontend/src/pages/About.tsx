import { Boxes, ClipboardList, ExternalLink, Globe, Mail, Network } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { Container } from '../components/ui/Container';
import { CTA } from '../components/ui/CTA';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';
import { ConnectionDiagram } from '../components/ui/ConnectionDiagram';
import { SITE } from '../config/site';
import ownerPhoto from '../assets/images/owner.webp';

const PILLARS = [
  {
    icon: Boxes,
    title: 'Experiencia en Supply Chain Management',
    text: 'El negocio de SSCM se centra en la gestión de la cadena de suministro: conectamos a las empresas con los proveedores que necesitan.',
  },
  {
    icon: Globe,
    title: 'Conocimiento de mercados internacionales',
    text: 'Conectamos empresas con proveedores y oportunidades comerciales en China y otros mercados internacionales.',
  },
  {
    icon: Network,
    title: 'Red de contactos de negocios y proveedores',
    text: 'Facilitamos conexiones comerciales a través de una red de contactos de negocios y proveedores.',
  },
  {
    icon: ClipboardList,
    title: 'Análisis de los requerimientos del cliente',
    text: 'Analizamos los requerimientos de cada empresa para orientar la búsqueda del proveedor adecuado.',
  },
] as const;

const isDev = !import.meta.env.PROD;

export default function About() {
  const ownerPending = isDev && !SITE.owner.name;
  const showOwner = isDev || Boolean(SITE.owner.name);
  const name = SITE.owner.name ?? (ownerPending ? 'Nombre sin definir' : undefined);
  const role = SITE.owner.role ?? (ownerPending ? 'Cargo sin definir' : undefined);
  const bio =
    SITE.owner.bio ??
    (ownerPending ? 'La biografía del dueño se agrega en src/config/site.ts (owner.bio).' : undefined);

  return (
    <>
      <PageHero
        title="Nosotros"
        subtitle="SSCM conecta empresas con proveedores y oportunidades comerciales en China y otros mercados internacionales."
        size="md"
      />

      <section className="bg-surface py-20 lg:py-24" aria-labelledby="about-intro-title">
        <Container>
          <Reveal>
            <h2 id="about-intro-title" className="text-3xl font-semibold text-heading sm:text-4xl">
              Quiénes somos
            </h2>
          </Reveal>
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="space-y-6 text-lg leading-relaxed text-muted">
                <p>
                  SSCM (Smart Supply Chain Management) es una plataforma de gestión de la
                  cadena de suministro.
                </p>
                <p>
                  El negocio conecta empresas con proveedores y oportunidades comerciales
                  en China y otros mercados internacionales.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ConnectionDiagram variant="stacked" />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-bg py-20 lg:py-24" aria-labelledby="about-pillars-title">
        <Container>
          <Reveal>
            <h2 id="about-pillars-title" className="mb-12 text-center text-3xl font-semibold text-heading sm:text-4xl">
              Lo que nos define
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.1} className="h-full">
                <article className="h-full rounded-[var(--radius)] border border-border bg-surface p-6 transition-colors hover:border-brand/50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius)] bg-brand/10 text-brand">
                    <pillar.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-heading">{pillar.title}</h3>
                  <p className="mt-3 text-muted">{pillar.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {showOwner && (
        <section className="bg-surface py-20 lg:py-24" aria-labelledby="about-owner-title">
          <Container>
            {ownerPending && (
              <p
                role="status"
                className="mb-8 rounded-[var(--radius)] border border-dashed border-amber-500/70 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-700"
              >
                PENDIENTE: datos del dueño
              </p>
            )}
            <Reveal>
              <h2 id="about-owner-title" className="text-3xl font-semibold text-heading sm:text-4xl">
                Quién está detrás
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-16">
                <img
                  src={ownerPhoto}
                  alt={name ? `Foto de ${name}` : ''}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full rounded-[var(--radius)] object-cover"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-heading sm:text-3xl">{name}</h3>
                  {role && <p className="mt-2 text-lg text-brand">{role}</p>}
                  {bio && <p className="mt-6 text-lg leading-relaxed text-muted">{bio}</p>}
                  {(SITE.owner.linkedin || SITE.email) && (
                    <div className="mt-8 flex flex-wrap gap-4">
                      {SITE.owner.linkedin && (
                        <Button asChild variant="outline" size="md">
                          <a href={SITE.owner.linkedin} target="_blank" rel="noopener noreferrer">
                            LinkedIn
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {SITE.email && (
                        <Button asChild variant="outline" size="md">
                          <a href={`mailto:${SITE.email}`}>
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      <CTA
        title="¿Buscás un proveedor para tu negocio?"
        subtitle="Contanos qué necesitás y analizaremos cómo podemos ayudarte a encontrar el contacto adecuado para tu necesidad comercial."
        buttonText="Solicitar asesoramiento"
        href="/contact"
      />
    </>
  );
}
