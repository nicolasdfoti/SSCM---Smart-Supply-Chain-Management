import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
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
    <header className="sticky top-0 z-50 bg-brand shadow-sm">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-white"
            aria-label="SSCM - Inicio"
          >
            <span className="text-xl font-semibold sm:text-2xl">SSCM</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    isActive || location.pathname === link.to
                      ? 'text-white underline decoration-white/80 underline-offset-4'
                      : 'text-white/80'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button asChild variant="secondary" size="sm">
              <Link to="/contact">Contacto</Link>
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden rounded-[var(--radius)] p-2 text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-white/10 bg-brand">
          <Container className="py-4">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white/90 hover:text-white"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild variant="secondary" size="sm" className="self-start">
                <Link to="/contact" onClick={closeMenu}>
                  Contacto
                </Link>
              </Button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
