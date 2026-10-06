import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { SITE } from '../../config/site';
import logo from '../../assets/brand/logo.png';

const YEAR = new Date().getFullYear();

const hasChannels = SITE.email || SITE.phone || SITE.whatsapp || SITE.linkedin;

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand text-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="pr-8">
            <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90" aria-label="SSCM - Inicio">
              <img src={logo} alt="" className="h-8 w-auto md:h-9" aria-hidden="true" />
              <span className="text-xl font-bold tracking-tight">SSCM</span>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              Conectamos empresas con proveedores y oportunidades comerciales
              en China y mercados internacionales, asegurando eficiencia y confianza en cada eslabón.
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">Navegación</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <Link to="/" className="text-white/60 transition-colors hover:text-accent">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/60 transition-colors hover:text-accent">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/60 transition-colors hover:text-accent">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/60 transition-colors hover:text-accent">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
              {hasChannels ? 'Canales directos' : 'Contacto'}
            </h3>
            <ul className="flex flex-col gap-4 text-sm">
              {hasChannels ? (
                <>
                  {SITE.email && (
                    <li>
                      <a href={`mailto:${SITE.email}`} className="text-white/60 transition-colors hover:text-accent">
                        {SITE.email}
                      </a>
                    </li>
                  )}
                  {SITE.phone && (
                    <li>
                      <a href={`tel:${SITE.phone}`} className="text-white/60 transition-colors hover:text-accent">
                        {SITE.phone}
                      </a>
                    </li>
                  )}
                  {SITE.whatsapp && (
                    <li>
                      <a
                        href={`https://wa.me/${String(SITE.whatsapp).replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 transition-colors hover:text-accent"
                      >
                        WhatsApp
                      </a>
                    </li>
                  )}
                  {SITE.linkedin && (
                    <li>
                      <a
                        href={SITE.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 transition-colors hover:text-accent"
                      >
                        LinkedIn
                      </a>
                    </li>
                  )}
                </>
              ) : (
                <li>
                  <Link to="/contact" className="text-white/60 transition-colors hover:text-accent">
                    Escribinos
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-sm text-white/40">
          <p>© {YEAR} SSCM. Todos los derechos reservados.</p>
          <p>Smart Supply Chain Management</p>
        </div>
      </Container>
    </footer>
  );
}