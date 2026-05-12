export function LoadingState({ label = "Cargando" }: { label?: string }) {
  return <p className="rounded-md border border-[var(--line)] bg-white p-4 text-sm text-[var(--muted)]">{label}...</p>;
}
