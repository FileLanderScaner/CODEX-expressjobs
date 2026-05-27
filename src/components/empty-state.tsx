export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="ej-glass border-dashed p-6 text-center">
      <h2 className="text-xl font-black">{title}</h2>
      <p className="ej-muted mt-2 text-sm">{text}</p>
    </div>
  );
}
