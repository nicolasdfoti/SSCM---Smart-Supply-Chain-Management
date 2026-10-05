import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PublicLayout from '../layouts/PublicLayout';
import { Container } from '../components/ui/Container';

export default function NotFound() {
  return (
    <PublicLayout>
      <Container className="py-16">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-5xl font-semibold text-slate-900">404</h1>
          <h2 className="mb-4 text-2xl font-medium text-slate-700">Página no encontrada</h2>
          <p className="mb-8 max-w-md text-slate-600">
            La página que buscas no existe o ha sido movida.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#002840] hover:text-[#004b68]"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </Container>
    </PublicLayout>
  );
}