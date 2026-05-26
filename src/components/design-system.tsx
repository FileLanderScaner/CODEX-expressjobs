import Link from "next/link";
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function PageShell({
  eyebrow,
  title,
  subtitle,
  actions,
  children,
  className,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cx("ej-page px-4 py-10", className)}>
      <div className="ej-container">
        {title ? (
          <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              {eyebrow ? <p className="ej-badge">{eyebrow}</p> : null}
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">{title}</h1>
              {subtitle ? <p className="ej-muted mt-4 max-w-3xl text-lg leading-8">{subtitle}</p> : null}
            </div>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        ) : null}
        {children}
      </div>
    </main>
  );
}

export function SectionShell({
  eyebrow,
  title,
  text,
  children,
  className,
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cx("py-10", className)}>
      {(eyebrow || title || text) ? (
        <div className="mb-6 max-w-3xl">
          {eyebrow ? <p className="ej-badge">{eyebrow}</p> : null}
          {title ? <h2 className="mt-4 text-3xl font-black tracking-tight">{title}</h2> : null}
          {text ? <p className="ej-muted mt-3 leading-7">{text}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function DarkCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx("ej-card p-5", className)}>{children}</div>;
}

export function GlassPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx("ej-glass p-5", className)}>{children}</div>;
}

export function PrimaryButton({
  href,
  children,
  icon: Icon,
  className,
}: {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <Link className={cx("focus-ring ej-btn-primary", className)} href={href}>
      {Icon ? <Icon aria-hidden="true" size={18} /> : null}
      {children}
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
  icon: Icon,
  className,
}: {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <Link className={cx("focus-ring ej-btn-secondary", className)} href={href}>
      {Icon ? <Icon aria-hidden="true" size={18} /> : null}
      {children}
    </Link>
  );
}

export function SafetyBanner({ children, variant = "safe" }: { children: React.ReactNode; variant?: "safe" | "warning" | "danger" }) {
  const Icon = variant === "safe" ? CheckCircle2 : AlertTriangle;
  const tone = variant === "safe" ? "border-[rgba(123,193,67,0.28)] bg-[var(--ej-accent-soft)] text-[#d9f7bd]" : variant === "warning" ? "border-[rgba(255,180,0,0.28)] bg-[var(--ej-warning-soft)] text-[#ffe08a]" : "border-[rgba(255,90,120,0.28)] bg-[var(--ej-danger-soft)] text-[#ffb4c2]";

  return (
    <div className={cx("flex items-start gap-3 rounded-2xl border p-4 text-sm font-semibold leading-6", tone)}>
      <Icon aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
      <div>{children}</div>
    </div>
  );
}

export function StatusBadge({ children, tone = "safe" }: { children: React.ReactNode; tone?: "safe" | "warning" | "danger" }) {
  return <span className={tone === "danger" ? "ej-danger-badge" : tone === "warning" ? "ej-warning-badge" : "ej-badge"}>{children}</span>;
}

export function StatusChecklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li className="ej-muted flex gap-2 text-sm leading-6" key={item}>
          <CheckCircle2 aria-hidden="true" className="mt-1 shrink-0 text-[var(--ej-accent)]" size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function AuthCard({ children }: { children: React.ReactNode }) {
  return <GlassPanel className="mx-auto max-w-xl p-6 sm:p-7">{children}</GlassPanel>;
}

export function DashboardShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <PageShell title={title} subtitle={subtitle} actions={actions}>
      <div className="grid gap-5">{children}</div>
    </PageShell>
  );
}

export function FormField({
  label,
  className,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[var(--ej-text)]">
      {label}
      <input className={cx("focus-ring ej-input font-normal", className)} {...props} />
    </label>
  );
}

export function TextAreaField({
  label,
  className,
  ...props
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[var(--ej-text)]">
      {label}
      <textarea className={cx("focus-ring ej-textarea font-normal", className)} {...props} />
    </label>
  );
}

export function SelectField({
  label,
  children,
  className,
  ...props
}: { label: string; children: React.ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[var(--ej-text)]">
      {label}
      <select className={cx("focus-ring ej-select font-normal", className)} {...props}>
        {children}
      </select>
    </label>
  );
}

export function LoadingState({ label = "Cargando" }: { label?: string }) {
  return (
    <div className="ej-card flex items-center gap-3 p-4 text-sm font-semibold text-[var(--ej-text-muted)]">
      <Loader2 aria-hidden="true" className="animate-spin text-[var(--ej-accent)]" size={18} />
      {label}...
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return <SafetyBanner variant="danger">{message}</SafetyBanner>;
}
