export function PricingCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-md border border-[var(--line)] bg-white p-5">
      <h2 className="text-lg font-black">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</p>
    </article>
  );
}
