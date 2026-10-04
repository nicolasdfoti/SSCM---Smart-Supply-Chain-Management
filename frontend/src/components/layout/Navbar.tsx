import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="bg-[#002840] shadow-sm">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-white"
            aria-label="SSCM - Home"
          >
            <Globe className="h-8 w-8" aria-hidden />
            <span className="text-xl font-semibold sm:text-2xl">SSCM</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-white/90 ${
                    isActive || location.pathname === link.to
                      ? 'text-white'
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
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden rounded-md p-2 text-white hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-white/10 bg-[#002840]">
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
                  Contact Us
                </Link>
              </Button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
