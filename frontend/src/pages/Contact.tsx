import { ContactForm } from './Contact/components/ContactForm';
import { PageHero } from '../components/ui/PageHero';

export default function Contact() {
  return (
    <>
      <PageHero
        title="Contacto"
        subtitle="Contanos qué necesitás y analizaremos cómo podemos ayudarte a encontrar el contacto adecuado para tu necesidad comercial."
        size="md"
      />
      <ContactForm />
    </>
  );
}