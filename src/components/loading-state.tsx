export function LoadingState({ label = "Cargando" }: { label?: string }) {
  return <p className="ej-card p-4 text-sm font-semibold text-[var(--ej-text-muted)]">{label}...</p>;
}
