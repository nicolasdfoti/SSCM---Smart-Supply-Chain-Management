import { HeroContact } from './Contact/components/HeroContact';
import { ContactInfo } from './Contact/components/ContactInfo';
import { ContactForm } from './Contact/components/ContactForm';

export default function Contact() {
  return (
    <>
      <HeroContact />
      <ContactInfo />
      <ContactForm />
    </>
  );
}