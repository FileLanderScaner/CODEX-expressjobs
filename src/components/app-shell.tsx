import Link from "next/link";
import { BadgeDollarSign, BriefcaseBusiness, ClipboardPlus, HelpCircle, Home, LogIn, UserCircle } from "lucide-react";
import { getAccountNavState } from "@/lib/account";
import { productionStatus } from "@/lib/env";
import { publicBrand } from "@/lib/expressjobs-data";
import { defaultWhatsAppSalesHref, publicSalesContact } from "@/lib/monetization/monetization-config";

const nav = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/como-funciona", label: "Como funciona", icon: HelpCircle },
  { href: "/worker/jobs", label: "Trabajos", icon: BriefcaseBusiness },
  { href: "/client/jobs/new", label: "Publicar", icon: ClipboardPlus },
  { href: "/ofertas", label: "Ofertas", icon: BadgeDollarSign },
];

export async function AppShell({ children }: { children: React.ReactNode }) {
  const accountNav = await getAccountNavState();

  return (
    <div className="ej-page">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[rgba(7,16,24,0.88)] text-white shadow-2xl shadow-black/25 backdrop-blur-xl">
        <div className="ej-container flex items-center justify-between gap-4 py-3">
          <Link href="/" className="focus-ring flex items-center gap-3 rounded-md">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--ej-accent)] text-sm font-black text-[#071018] shadow-lg shadow-green-900/30">
              TR
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-black tracking-tight">{publicBrand.productName}</span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--ej-text-soft)]">{publicBrand.technicalName}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                className="focus-ring nav-underline inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--ej-text-muted)] transition hover:text-white"
                href={item.href}
                key={item.href}
              >
                <item.icon aria-hidden="true" size={16} />
                {item.label}
              </Link>
            ))}
            {accountNav.isSignedIn ? (
              <Link
                className="focus-ring nav-underline inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--ej-text-muted)] transition hover:text-white"
                href="/profile"
              >
                <UserCircle aria-hidden="true" size={16} />
                Mi cuenta
              </Link>
            ) : null}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              className="focus-ring ej-btn-secondary max-w-[12rem] truncate px-4 py-2 text-xs uppercase tracking-[0.1em]"
              href={accountNav.href}
            >
              {accountNav.isSignedIn ? <UserCircle aria-hidden="true" size={16} /> : <LogIn aria-hidden="true" size={16} />}
              <span className="truncate">{accountNav.isSignedIn ? "Mi cuenta" : accountNav.label}</span>
            </Link>
            <span className="ej-danger-badge ej-desktop-only-badge text-[10px] uppercase tracking-[0.16em]">
              {productionStatus()}
            </span>
          </div>
        </div>
        <nav className="ej-container flex gap-2 overflow-x-auto pb-3 lg:hidden" aria-label="Navegacion movil">
          {nav.map((item) => (
            <Link
              className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-[11px] font-black uppercase tracking-[0.1em] text-[var(--ej-text-muted)]"
              href={item.href}
              key={item.href}
            >
              <item.icon aria-hidden="true" size={14} />
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {children}

      <footer className="border-t border-white/10 bg-[rgba(5,9,13,0.94)] text-[var(--ej-text-muted)]">
        <div className="ej-container grid gap-5 py-8 text-sm md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-black text-white">{publicBrand.combinedName}</p>
            <p className="mt-2 max-w-2xl leading-6">
              Version MVP para usuarios controlados. Sin pagos reales activos. Produccion publica permanece {productionStatus()}.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-bold md:justify-end">
            <a className="focus-ring rounded-md underline decoration-[var(--brand)] underline-offset-4" href={defaultWhatsAppSalesHref()}>
              WhatsApp 097045305
            </a>
            <a className="focus-ring rounded-md underline decoration-[var(--brand)] underline-offset-4" href={`mailto:${publicSalesContact.email}`}>
              {publicSalesContact.email}
            </a>
            <span className="ej-danger-badge">{productionStatus()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
