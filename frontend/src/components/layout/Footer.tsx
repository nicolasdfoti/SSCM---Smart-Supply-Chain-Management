import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { SITE } from '../../config/site';

const YEAR = new Date().getFullYear();

const hasChannels = SITE.email || SITE.phone || SITE.whatsapp || SITE.linkedin;

export function Footer() {
  return (
    <footer className="border-t border-border bg-brand text-white">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-3" aria-label="SSCM - Inicio">
              <img src="/logo.png" alt="" className="h-9 w-auto" aria-hidden="true" />
              <span className="text-xl font-semibold">SSCM</span>
            </Link>
            <p className="mt-4 text-sm text-white/80">
              Conectamos empresas con proveedores y oportunidades comerciales
              en China y mercados internacionales.
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <h3 className="mb-4 font-semibold">Navegación</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link to="/" className="text-white/80 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-white">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 font-semibold">
              {hasChannels ? 'Canales directos' : 'Contacto'}
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {hasChannels ? (
                <>
                  {SITE.email && (
                    <li>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="text-white/80 hover:text-white"
                      >
                        {SITE.email}
                      </a>
                    </li>
                  )}
                  {SITE.phone && (
                    <li>
                      <a
                        href={`tel:${SITE.phone}`}
                        className="text-white/80 hover:text-white"
                      >
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
                        className="text-white/80 hover:text-white"
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
                        className="text-white/80 hover:text-white"
                      >
                        LinkedIn
                      </a>
                    </li>
                  )}
                </>
              ) : (
                <li>
                  <Link to="/contact" className="text-white/80 hover:text-white">
                    Escribinos
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          © {YEAR} SSCM. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}