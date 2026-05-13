import { Send } from "lucide-react";
import { buildWhatsAppShareUrl } from "@/lib/whatsapp";

export function WhatsAppShareButton({ text }: { text: string }) {
  return (
    <a
      className="focus-ring inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-3 py-2 text-sm font-semibold hover:bg-[#f3f5f1]"
      href={buildWhatsAppShareUrl(text)}
      rel="noreferrer"
      target="_blank"
    >
      <Send aria-hidden="true" size={16} /> WhatsApp
    </a>
  );
}
