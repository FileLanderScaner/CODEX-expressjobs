import { AlertCircle, CheckCircle2, MapPin } from "lucide-react";
import { categories } from "@/lib/expressjobs-data";

export function JobForm() {
  return (
    <form className="grid gap-4 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
      <div className="rounded-md bg-[#eef7f1] p-3 text-sm text-[var(--brand-dark)]">
        <CheckCircle2 aria-hidden="true" className="mr-2 inline" size={16} />
        Preview sin pagos reales. Describe una tarea simple y segura para recibir postulaciones.
      </div>
      <label className="grid gap-2 text-sm font-bold">
        Titulo
        <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" placeholder="Ej: Pintar una habitacion, mover cajas, reparar una canilla" />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Categoria
        <select className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal">
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Descripcion
        <textarea className="focus-ring min-h-32 rounded-md border border-[var(--line)] px-3 py-2 font-normal" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
        Ubicacion
          <div className="relative">
            <MapPin aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={16} />
            <input className="focus-ring w-full rounded-md border border-[var(--line)] py-2 pl-9 pr-3 font-normal" placeholder="Barrio, ciudad" />
          </div>
        </label>
        <label className="grid gap-2 text-sm font-bold">
        Presupuesto aproximado
          <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" placeholder="UYU" />
        </label>
      </div>
      <p className="flex items-start gap-2 text-xs leading-5 text-[var(--muted)]">
        <AlertCircle aria-hidden="true" className="mt-0.5 shrink-0" size={14} />
        No publiques tareas peligrosas, ilegales o con datos sensibles. La aceptacion y pago real no estan activos en este MVP.
      </p>
      <button className="focus-ring rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white hover:bg-[var(--brand-dark)]" type="button">
        Publicar una tarea
      </button>
    </form>
  );
}
