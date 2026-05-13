import { Send } from "lucide-react";

export function ChatBox({
  messages,
}: {
  messages: Array<{ id: string; senderName: string; body: string; createdAt: string }>;
}) {
  return (
    <section className="rounded-md border border-[var(--line)] bg-white p-4">
      <h2 className="text-xl font-black">Chat basico</h2>
      <div className="mt-4 grid gap-3">
        {messages.map((message) => (
          <div className="rounded-md bg-[#f7f6f2] p-3" key={message.id}>
            <p className="text-xs font-bold text-[var(--muted)]">{message.senderName}</p>
            <p className="mt-1 text-sm">{message.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input className="focus-ring min-w-0 flex-1 rounded-md border border-[var(--line)] px-3 py-2" placeholder="Escribir mensaje" />
        <button className="focus-ring inline-flex items-center gap-2 rounded-md bg-[var(--brand)] px-3 py-2 text-sm font-bold text-white">
          <Send aria-hidden="true" size={16} /> Enviar
        </button>
      </div>
    </section>
  );
}
