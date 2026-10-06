import { Globe2, Ship, Warehouse, TrendingUp } from 'lucide-react';
import { Container } from '../../../components/ui/Container';
import { SectionHeading } from '../../../components/ui/SectionHeading';

const PREVIEW_SERVICES = [
  {
    icon: Globe2,
    title: 'Global Sourcing',
    description: 'Connecting businesses with trusted suppliers in China and international markets.',
  },
  {
    icon: Ship,
    title: 'International Logistics',
    description: 'Structured solutions to support cross-border supply chain operations.',
  },
  {
    icon: Warehouse,
    title: 'Supply Chain Optimization',
    description: 'Streamlining processes to improve efficiency and reliability.',
  },
  {
    icon: TrendingUp,
    title: 'Market Intelligence',
    description: 'Insights to support informed business decisions in global markets.',
  },
];

export function ServicesPreview() {
  return (
    <section className="bg-bg py-16">
      <Container>
        <SectionHeading
          title="Our Services"
          subtitle="Supporting your business growth in global supply chains"
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PREVIEW_SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-[var(--radius)] border border-border bg-surface p-6 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius)] bg-brand/10">
                <service.icon className="h-6 w-6 text-brand" aria-hidden />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-heading">
                {service.title}
              </h3>
              <p className="text-sm text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
