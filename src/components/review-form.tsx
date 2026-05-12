import { Star } from "lucide-react";

export function ReviewForm() {
  return (
    <form className="rounded-md border border-[var(--line)] bg-white p-4">
      <h2 className="text-xl font-black">Dejar reseña</h2>
      <label className="mt-4 grid gap-2 text-sm font-bold">
        Calificacion
        <select className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" defaultValue="5">
          {[5, 4, 3, 2, 1].map((rating) => (
            <option key={rating} value={rating}>{rating} estrellas</option>
          ))}
        </select>
      </label>
      <label className="mt-4 grid gap-2 text-sm font-bold">
        Comentario
        <textarea className="focus-ring min-h-24 rounded-md border border-[var(--line)] px-3 py-2 font-normal" />
      </label>
      <button className="focus-ring mt-4 inline-flex items-center gap-2 rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white" type="button">
        <Star aria-hidden="true" size={16} /> Guardar reseña
      </button>
    </form>
  );
}
