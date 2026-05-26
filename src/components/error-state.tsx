export function ErrorState({ message }: { message: string }) {
  return <p className="rounded-2xl border border-[rgba(255,90,120,0.28)] bg-[var(--ej-danger-soft)] p-4 text-sm font-semibold text-[#ffb4c2]">{message}</p>;
}
