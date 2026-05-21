import Link from "next/link";
import { BadgeDollarSign, BriefcaseBusiness, ClipboardPlus, Home, Info, LogIn, ShieldCheck } from "lucide-react";
import { productionStatus } from "@/lib/env";
import { publicBrand } from "@/lib/expressjobs-data";
import { defaultWhatsAppSalesHref, publicSalesContact } from "@/lib/monetization/monetization-config";

const nav = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/worker/jobs", label: "Trabajos", icon: BriefcaseBusiness },
  { href: "/client/jobs/new", label: "Publicar trabajo", icon: ClipboardPlus },
  { href: "/como-funciona", label: "Como funciona", icon: Info },
  { href: "/seguridad", label: "Seguridad", icon: ShieldCheck },
  { href: "/ofertas", label: "Ofertas", icon: BadgeDollarSign },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-white/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="focus-ring flex items-center gap-2 rounded-md">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--brand)] text-sm font-bold text-white">
              TR
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold">{publicBrand.productName}</span>
              <span className="block text-xs font-semibold text-[var(--muted)]">{publicBrand.technicalName}</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                className="focus-ring inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-[var(--muted)] hover:bg-[#edf3ee] hover:text-[var(--foreground)]"
                href={item.href}
                key={item.href}
              >
                <item.icon aria-hidden="true" size={17} />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-[var(--brand)] px-3 py-2 text-xs font-black text-white shadow-sm hover:bg-[var(--brand-dark)]"
              href="/auth"
            >
              <LogIn aria-hidden="true" size={16} />
              Ingresar
            </Link>
            <span className="hidden rounded-md border border-[#e2b8b1] bg-[#fff4f2] px-2 py-1 text-xs font-bold text-[var(--danger)] sm:inline-flex">
              {productionStatus()}
            </span>
          </div>
        </div>
      </header>
      {children}
      <footer className="border-t border-[var(--line)] bg-white">
        <div className="mx-auto grid max-w-6xl gap-3 px-4 py-6 text-sm text-[var(--muted)] md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-black text-[var(--foreground)]">{publicBrand.combinedName}</p>
            <p className="mt-1">Version MVP para usuarios controlados. Pagos online, verificacion de identidad y garantias comerciales siguen desactivados.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-bold">
            <a className="focus-ring rounded-md underline" href={defaultWhatsAppSalesHref()}>WhatsApp 097045305</a>
            <a className="focus-ring rounded-md underline" href={`mailto:${publicSalesContact.email}`}>{publicSalesContact.email}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
