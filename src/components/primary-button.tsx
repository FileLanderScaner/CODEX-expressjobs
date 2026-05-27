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
      className="focus-ring ej-btn-primary text-sm"
      href={href}
    >
      {Icon ? <Icon aria-hidden="true" size={18} /> : null}
      {children}
    </Link>
  );
}
