import Link from "next/link";
import { BriefcaseBusiness, CircleDollarSign, LayoutDashboard, UserRoundCheck } from "lucide-react";
import { productionStatus } from "@/lib/env";
import { publicBrand } from "@/lib/expressjobs-data";

const nav = [
  { href: "/worker/jobs", label: "Trabajos", icon: BriefcaseBusiness },
  { href: "/client", label: "Cliente", icon: LayoutDashboard },
  { href: "/worker", label: "Trabajador", icon: UserRoundCheck },
  { href: "/pricing", label: "Pricing", icon: CircleDollarSign },
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
          <span className="rounded-md border border-[#e2b8b1] bg-[#fff4f2] px-2 py-1 text-xs font-bold text-[var(--danger)]">
            {productionStatus()}
          </span>
        </div>
      </header>
      {children}
    </div>
  );
}
