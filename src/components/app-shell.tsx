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
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[var(--dark)]/95 text-white shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="focus-ring flex items-center gap-3 rounded-md">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--brand)] text-sm font-black text-white shadow-lg shadow-green-900/30">
              TR
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-black tracking-tight">{publicBrand.productName}</span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--dark-muted)]">{publicBrand.technicalName}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                className="focus-ring nav-underline inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--dark-muted)] transition hover:text-white"
                href={item.href}
                key={item.href}
              >
                <item.icon aria-hidden="true" size={16} />
                {item.label}
              </Link>
            ))}
            {accountNav.isSignedIn ? (
              <Link
                className="focus-ring nav-underline inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--dark-muted)] transition hover:text-white"
                href="/profile"
              >
                <UserCircle aria-hidden="true" size={16} />
                Mi cuenta
              </Link>
            ) : null}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              className="focus-ring inline-flex max-w-[12rem] items-center gap-2 truncate rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-[var(--dark)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--brand-soft)]"
              href={accountNav.href}
            >
              {accountNav.isSignedIn ? <UserCircle aria-hidden="true" size={16} /> : <LogIn aria-hidden="true" size={16} />}
              <span className="truncate">{accountNav.isSignedIn ? "Mi cuenta" : accountNav.label}</span>
            </Link>
            <span className="hidden rounded-full border border-red-300/30 bg-red-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-red-100 lg:inline-flex">
              {productionStatus()}
            </span>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-[var(--dark-line)] bg-[var(--dark)] text-[var(--dark-muted)]">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 text-sm md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-black text-white">{publicBrand.combinedName}</p>
            <p className="mt-2 max-w-2xl leading-6">
              Version MVP para usuarios controlados. Pagos online, verificacion de identidad y garantias comerciales siguen desactivados.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-bold">
            <a className="focus-ring rounded-md underline decoration-[var(--brand)] underline-offset-4" href={defaultWhatsAppSalesHref()}>
              WhatsApp 097045305
            </a>
            <a className="focus-ring rounded-md underline decoration-[var(--brand)] underline-offset-4" href={`mailto:${publicSalesContact.email}`}>
              {publicSalesContact.email}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
