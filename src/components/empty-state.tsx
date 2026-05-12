export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-md border border-dashed border-[var(--line)] bg-white p-6 text-center">
      <h2 className="text-xl font-black">{title}</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">{text}</p>
    </div>
  );
}
