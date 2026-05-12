import { categories } from "@/lib/expressjobs-data";

export function JobForm() {
  return (
    <form className="grid gap-4 rounded-md border border-[var(--line)] bg-white p-5">
      <label className="grid gap-2 text-sm font-bold">
        Titulo
        <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" placeholder="Ej: Pintar una habitacion" />
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
          <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" placeholder="Barrio, ciudad" />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Presupuesto
          <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" placeholder="UYU" />
        </label>
      </div>
      <button className="focus-ring rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white hover:bg-[var(--brand-dark)]" type="button">
        Crear trabajo
      </button>
    </form>
  );
}
