import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Container } from '../ui/Container';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#002840] text-white">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-8 w-8" aria-hidden />
            <div>
              <div className="text-lg font-semibold">SSCM</div>
              <div className="text-sm text-white/80">
                Smart Supply Chain Management
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-6 text-sm">
            <Link to="/" className="text-white/80 hover:text-white">
              Home
            </Link>
            <Link to="/services" className="text-white/80 hover:text-white">
              Services
            </Link>
            <Link to="/about" className="text-white/80 hover:text-white">
              About Us
            </Link>
            <Link to="/contact" className="text-white/80 hover:text-white">
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          © 2026 SSCM. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
