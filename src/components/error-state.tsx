import { AlertTriangle } from "lucide-react";

export function ErrorState({ message }: { message: string }) {
  return (
    <p className="flex items-start gap-3 rounded-lg border border-[rgba(239,68,68,0.32)] bg-[var(--ej-danger-soft)] p-4 text-sm font-semibold leading-6 text-red-200">
      <AlertTriangle aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
      <span>{message}</span>
    </p>
  );
}
