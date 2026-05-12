export function ErrorState({ message }: { message: string }) {
  return <p className="rounded-md border border-[#e2b8b1] bg-[#fff4f2] p-4 text-sm font-semibold text-[var(--danger)]">{message}</p>;
}
