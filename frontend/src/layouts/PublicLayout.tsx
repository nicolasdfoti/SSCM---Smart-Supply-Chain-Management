import { useOutlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PageMetadata } from '../components/ui/PageMetadata';

export default function PublicLayout({ children }: { children?: React.ReactNode }) {
  const outlet = useOutlet();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageMetadata />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-brand focus:text-white focus:rounded-[var(--radius)] focus:outline-2 focus:outline-offset-2 focus:outline-accent">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {outlet ?? children}
      </main>
      <Footer />
    </div>
  );
}