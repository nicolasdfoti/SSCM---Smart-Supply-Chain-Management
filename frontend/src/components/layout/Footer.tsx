import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border bg-brand text-white">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div>
              <div className="text-lg font-semibold">SSCM</div>
              <div className="text-sm text-white/80">
                Smart Supply Chain Management
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-6 text-sm">
            <Link to="/" className="text-white/80 hover:text-white">
              Inicio
            </Link>
            <Link to="/about" className="text-white/80 hover:text-white">
              Nosotros
            </Link>
            <Link to="/contact" className="text-white/80 hover:text-white">
              Contacto
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          © {YEAR} SSCM. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}
