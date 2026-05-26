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
    <article className="ej-card flex h-full flex-col p-5">
      {Icon ? <Icon aria-hidden="true" className="text-[var(--ej-accent)]" size={24} /> : null}
      <h2 className="mt-3 text-xl font-black">{title}</h2>
      <p className="mt-2 text-2xl font-black text-[var(--ej-accent)]">{price}</p>
      <p className="ej-muted mt-2 flex-1 text-sm leading-6">{text}</p>
      <a
        className="focus-ring ej-btn-secondary mt-5 text-sm"
        href={ctaHref}
      >
        {ctaLabel}
        <MessageCircle aria-hidden="true" size={18} />
      </a>
    </article>
  );
}
