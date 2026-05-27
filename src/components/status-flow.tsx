import { jobStatuses } from "@/lib/expressjobs-data";

const labels: Record<(typeof jobStatuses)[number], string> = {
  draft: "Borrador",
  open: "Abierto",
  applied: "Con postulaciones",
  accepted: "Aceptado",
  in_progress: "En curso",
  completed: "Completado",
  cancelled: "Cancelado",
  disputed: "En disputa",
};

export function StatusFlow() {
  return (
    <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {jobStatuses.map((status, index) => (
        <li className="ej-card p-3" key={status}>
          <span className="ej-soft text-xs font-bold">Etapa {index + 1}</span>
          <p className="mt-1 font-bold">{labels[status]}</p>
        </li>
      ))}
    </ol>
  );
}
