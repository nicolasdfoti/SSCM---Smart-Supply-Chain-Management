import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import logo from '../../assets/brand/logo.png';

const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/services' },
  { label: 'Nosotros', to: '/about' },
  { label: 'Contacto', to: '/contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, closeMenu]);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      setMobileOpen(false);
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6 md:h-20">
          <Link
            to="/"
            className="flex items-center gap-3 text-white transition-opacity hover:opacity-90"
            aria-label="SSCM - Inicio"
          >
            <img src={logo} alt="" className="h-8 w-auto md:h-9" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight sm:text-2xl">SSCM</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    isActive || location.pathname === link.to
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button asChild variant="secondary" size="sm" className="shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-shadow hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <Link to="/contact">Solicitar asesoramiento</Link>
            </Button>
          </div>

          <button
            type="button"
            className="rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-white/10 bg-brand/95 backdrop-blur-xl lg:hidden">
          <Container className="py-6">
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-base font-medium text-white/80 transition-colors hover:text-white"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild variant="secondary" size="md" className="mt-2 self-start">
                <Link to="/contact" onClick={closeMenu}>
                  Solicitar asesoramiento
                </Link>
              </Button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}