import { Inbox } from "lucide-react";

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="ej-glass grid gap-3 border-dashed p-6 text-center">
      <span className="mx-auto grid h-10 w-10 place-items-center rounded-lg border border-[var(--ej-border)] bg-white/[0.06] text-blue-200">
        <Inbox aria-hidden="true" size={20} />
      </span>
      <h2 className="text-xl font-black">{title}</h2>
      <p className="ej-muted mx-auto max-w-lg text-sm leading-6">{text}</p>
    </div>
  );
}
