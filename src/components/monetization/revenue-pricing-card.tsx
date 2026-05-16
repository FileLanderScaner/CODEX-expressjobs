import type { LucideIcon } from "lucide-react";
import { MessageCircle } from "lucide-react";

export function RevenuePricingCard({
  title,
  price,
  text,
  icon: Icon,
  ctaHref = "#contacto-oferta",
  ctaLabel = "Consultar esta oferta",
}: {
  title: string;
  price: string;
  text: string;
  icon?: LucideIcon;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
      {Icon ? <Icon aria-hidden="true" className="text-[var(--brand)]" size={24} /> : null}
      <h2 className="mt-3 text-xl font-black">{title}</h2>
      <p className="mt-2 text-2xl font-black text-[var(--brand)]">{price}</p>
      <p className="mt-2 flex-1 text-sm leading-6 text-[var(--muted)]">{text}</p>
      <a
        className="focus-ring mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-[var(--brand)] px-4 py-3 text-sm font-black text-[var(--brand)] hover:bg-[#eef4ef]"
        href={ctaHref}
      >
        {ctaLabel}
        <MessageCircle aria-hidden="true" size={18} />
      </a>
    </article>
  );
}
