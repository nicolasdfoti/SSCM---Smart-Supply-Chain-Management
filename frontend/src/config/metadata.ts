interface OGImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

interface OpenGraph {
  title: string;
  description: string;
  type: string;
  url: string;
  siteName: string;
  images: OGImage[];
}

interface Other {
  canonical: string;
}

interface Metadata {
  title: string;
  description: string;
  openGraph: OpenGraph;
  other: Other;
}

export const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173';
export const SITE_NAME = 'SSCM — Smart Supply Chain Management';
export const DEFAULT_DESCRIPTION =
  'SSCM conecta empresas con proveedores y oportunidades comerciales en China y mercados internacionales para fortalecer sus cadenas de suministro.';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const pageMetadata: Record<string, Metadata> = {
  '/': {
    title: 'SSCM — Smart Supply Chain Management',
    description:
      'SSCM ayuda a empresas a encontrar proveedores confiables en China y mercados internacionales. Conectamos tu negocio con oportunidades de abastecimiento y sourcing global.',
    openGraph: {
      title: 'SSCM — Smart Supply Chain Management',
      description:
        'SSCM ayuda a empresas a encontrar proveedores confiables en China y mercados internacionales.',
      type: 'website',
      url: SITE_URL,
      siteName: SITE_NAME,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'SSCM - Smart Supply Chain Management' }],
    },
    other: {
      canonical: SITE_URL,
    },
  },
  '/about': {
    title: 'Nosotros — SSCM',
    description:
      'Conoce a SSCM: experiencia, análisis y red internacional para conectar tu empresa con proveedores globales. Facilitamos conexiones de abastecimiento confiables.',
    openGraph: {
      title: 'Nosotros — SSCM',
      description:
        'Conoce a SSCM: experiencia, análisis y red internacional para conectar tu empresa con proveedores globales.',
      type: 'website',
      url: `${SITE_URL}/about`,
      siteName: SITE_NAME,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'SSCM - Smart Supply Chain Management' }],
    },
    other: {
      canonical: `${SITE_URL}/about`,
    },
  },
  '/contact': {
    title: 'Contacto — SSCM',
    description:
      'Contacta a SSCM para solicitar asesoramiento en búsqueda de proveedores, sourcing internacional y abastecimiento. Te ayudamos a encontrar el contacto comercial adecuado.',
    openGraph: {
      title: 'Contacto — SSCM',
      description:
        'Contacta a SSCM para solicitar asesoramiento en búsqueda de proveedores y sourcing internacional.',
      type: 'website',
      url: `${SITE_URL}/contact`,
      siteName: SITE_NAME,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'SSCM - Smart Supply Chain Management' }],
    },
    other: {
      canonical: `${SITE_URL}/contact`,
    },
  },
  '/services': {
    title: 'Servicios — SSCM',
    description:
      'SSCM ofrece búsqueda de proveedores, sourcing internacional, verificación y due diligence, y gestión de compras. Conectamos tu empresa con proveedores globales mediante un proceso en 4 etapas.',
    openGraph: {
      title: 'Servicios — SSCM',
      description:
        'SSCM ofrece búsqueda de proveedores, sourcing, verificación y gestión de compras internacionales.',
      type: 'website',
      url: `${SITE_URL}/services`,
      siteName: SITE_NAME,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'SSCM - Smart Supply Chain Management' }],
    },
    other: {
      canonical: `${SITE_URL}/services`,
    },
  },
};

export function getMetadata(pathname: string): Metadata {
  return pageMetadata[pathname] ?? pageMetadata['/'];
}