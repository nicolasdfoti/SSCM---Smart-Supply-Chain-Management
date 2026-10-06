type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 text-center ${className}`}>
      <h2 className="text-3xl font-semibold text-heading sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted">{subtitle}</p>
      )}
    </div>
  );
}
