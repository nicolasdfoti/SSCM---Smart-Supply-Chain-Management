import { useOutlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export default function PublicLayout({ children }: { children?: React.ReactNode }) {
  const outlet = useOutlet();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {outlet ?? children}
      </main>
      <Footer />
    </div>
  );
}