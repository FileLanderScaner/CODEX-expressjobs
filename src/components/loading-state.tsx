import { Loader2 } from "lucide-react";

export function LoadingState({ label = "Cargando" }: { label?: string }) {
  return (
    <p className="ej-card flex items-center gap-3 p-4 text-sm font-semibold text-[var(--ej-text-muted)]">
      <Loader2 aria-hidden="true" className="animate-spin text-[var(--ej-accent)]" size={18} />
      {label}...
    </p>
  );
}
