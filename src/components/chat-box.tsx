import { Send } from "lucide-react";

export function ChatBox({
  messages,
}: {
  messages: Array<{ id: string; senderName: string; body: string; createdAt: string }>;
}) {
  return (
    <section className="ej-card p-4">
      <h2 className="text-xl font-black">Chat basico</h2>
      <div className="mt-4 grid gap-3">
        {messages.map((message) => (
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3" key={message.id}>
            <p className="ej-soft text-xs font-bold">{message.senderName}</p>
            <p className="mt-1 text-sm">{message.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input className="focus-ring ej-input min-w-0 flex-1" placeholder="Escribir mensaje" />
        <button className="focus-ring ej-btn-primary px-3 py-2 text-sm">
          <Send aria-hidden="true" size={16} /> Enviar
        </button>
      </div>
    </section>
  );
}
