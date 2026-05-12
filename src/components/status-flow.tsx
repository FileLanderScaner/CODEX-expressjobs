import { jobStatuses } from "@/lib/expressjobs-data";

export function StatusFlow() {
  return (
    <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {jobStatuses.map((status, index) => (
        <li className="rounded-md border border-[var(--line)] bg-white p-3" key={status}>
          <span className="text-xs font-bold text-[var(--muted)]">Paso {index + 1}</span>
          <p className="mt-1 font-bold">{status}</p>
        </li>
      ))}
    </ol>
  );
}
