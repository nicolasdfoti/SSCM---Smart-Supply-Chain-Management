import { CheckCircle } from 'lucide-react';
import { Container } from '../../../components/ui/Container';

const VALUE_POINTS = [
  'Professional expertise in international supply chains',
  'Reliable supplier network connections',
  'Strong focus on efficiency and trust',
  'Tailored solutions for diverse business needs',
];

export function AboutPreview() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
              About SSCM
            </h2>
            <p className="mb-6 text-lg text-slate-600">
              SSCM (Smart Supply Chain Management) is a corporate platform designed to help businesses connect with suppliers and business opportunities across China and international markets. We focus on building trusted relationships that support sustainable business growth.
            </p>
            <ul className="space-y-4">
              {VALUE_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-[#087ea4]" aria-hidden />
                  <span className="text-base text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-80 overflow-hidden rounded-lg bg-[#002840]/10 lg:h-96">
            <img
              src="/hero.png"
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002840]/40 to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  );
}
