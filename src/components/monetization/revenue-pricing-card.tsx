import type { LucideIcon } from "lucide-react";

export function RevenuePricingCard({
  title,
  price,
  text,
  icon: Icon,
}: {
  title: string;
  price: string;
  text: string;
  icon?: LucideIcon;
}) {
  return (
    <article className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
      {Icon ? <Icon aria-hidden="true" className="text-[var(--brand)]" size={24} /> : null}
      <h2 className="mt-3 text-xl font-black">{title}</h2>
      <p className="mt-2 text-2xl font-black text-[var(--brand)]">{price}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</p>
    </article>
  );
}
