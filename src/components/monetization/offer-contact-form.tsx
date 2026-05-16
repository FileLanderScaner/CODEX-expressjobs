"use client";

import { MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { publicSalesContact } from "@/lib/monetization/monetization-config";

export function OfferContactForm() {
  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");

  const href = useMemo(() => {
    const text = [
      "Hola, quiero consultar por Trabajos Rapidos.",
      name.trim() ? `Nombre: ${name.trim()}` : null,
      businessType.trim() ? `Rubro: ${businessType.trim()}` : null,
      phone.trim() ? `Telefono: ${phone.trim()}` : null,
      service.trim() ? `Servicio deseado: ${service.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/${publicSalesContact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }, [businessType, name, phone, service]);

  return (
    <form className="grid gap-3 rounded-md border border-[var(--line)] bg-[#f8faf7] p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          Nombre
          <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" onChange={(event) => setName(event.target.value)} value={name} />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Rubro
          <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" onChange={(event) => setBusinessType(event.target.value)} value={businessType} />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Telefono
          <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" inputMode="tel" onChange={(event) => setPhone(event.target.value)} value={phone} />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Servicio deseado
          <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" onChange={(event) => setService(event.target.value)} value={service} />
        </label>
      </div>
      <a className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-black text-white hover:bg-[var(--brand-dark)]" href={href}>
        Consultar por WhatsApp
        <MessageCircle aria-hidden="true" size={18} />
      </a>
    </form>
  );
}
