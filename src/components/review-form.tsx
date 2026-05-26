import { Star } from "lucide-react";

export function ReviewForm() {
  return (
    <form className="ej-card p-4">
      <h2 className="text-xl font-black">Dejar resena</h2>
      <label className="mt-4 grid gap-2 text-sm font-bold">
        Calificacion
        <select className="focus-ring ej-select font-normal" defaultValue="5">
          {[5, 4, 3, 2, 1].map((rating) => (
            <option key={rating} value={rating}>{rating} estrellas</option>
          ))}
        </select>
      </label>
      <label className="mt-4 grid gap-2 text-sm font-bold">
        Comentario
        <textarea className="focus-ring ej-textarea min-h-24 font-normal" />
      </label>
      <button className="focus-ring ej-btn-primary mt-4 text-sm" type="button">
        <Star aria-hidden="true" size={16} /> Guardar resena
      </button>
    </form>
  );
}
