import { ClipboardList } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { categories } from "@/lib/expressjobs-data";

export default function NewJobPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex items-center gap-3">
          <ClipboardList aria-hidden="true" className="text-[var(--brand)]" size={28} />
          <h1 className="text-3xl font-black">Publicar trabajo</h1>
        </div>
        <form className="mt-6 grid gap-4 rounded-md border border-[var(--line)] bg-white p-5">
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
            Crear borrador seguro
          </button>
        </form>
      </main>
    </AppShell>
  );
}
