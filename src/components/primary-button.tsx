import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function PrimaryButton({
  href,
  children,
  icon: Icon,
}: {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <Link
      className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-[var(--brand-dark)]"
      href={href}
    >
      {Icon ? <Icon aria-hidden="true" size={18} /> : null}
      {children}
    </Link>
  );
}
