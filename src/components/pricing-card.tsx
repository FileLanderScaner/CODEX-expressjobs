import { CheckCircle2 } from "lucide-react";

export function PricingCard({
  title,
  text,
  price,
  badge,
  features = [],
}: {
  title: string;
  text: string;
  price?: string;
  badge?: string;
  features?: readonly string[];
}) {
  return (
    <article className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-lg font-black">{title}</h2>
        {badge ? <span className="rounded-md bg-[#eef4ef] px-2 py-1 text-xs font-bold text-[var(--brand-dark)]">{badge}</span> : null}
      </div>
      {price ? <p className="mt-4 text-2xl font-black">{price}</p> : null}
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</p>
      {features.length ? (
        <ul className="mt-4 grid gap-2 text-sm text-[var(--muted)]">
          {features.map((feature) => (
            <li className="flex items-start gap-2" key={feature}>
              <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--brand)]" size={16} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
