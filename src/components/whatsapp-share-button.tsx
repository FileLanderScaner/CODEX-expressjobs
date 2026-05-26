import { Send } from "lucide-react";
import { buildWhatsAppShareUrl } from "@/lib/whatsapp";

export function WhatsAppShareButton({ text }: { text: string }) {
  return (
    <a
      className="focus-ring ej-btn-secondary px-3 py-2 text-sm"
      href={buildWhatsAppShareUrl(text)}
      rel="noreferrer"
      target="_blank"
    >
      <Send aria-hidden="true" size={16} /> WhatsApp
    </a>
  );
}
