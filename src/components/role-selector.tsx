"use client";

import { BriefcaseBusiness, ChevronRight, UserRoundCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authHref, ensureMarketplaceRole, fullNameFromUser } from "@/lib/marketplace";
import { getBrowserSupabaseClient } from "@/lib/supabase";

type RoleChoice = "client" | "worker";

const choices = [
  {
    role: "client" as const,
    href: "/client/jobs/new",
    icon: BriefcaseBusiness,
    title: "Busco ayuda",
    text: "Publica una tarea, compara postulaciones y coordina con mas claridad.",
    button: "Publicar una tarea",
  },
  {
    role: "worker" as const,
    href: "/worker/jobs",
    icon: UserRoundCheck,
    title: "Quiero trabajar",
    text: "Encuentra tareas cercanas y postulate sin promesas de empleo o ingresos garantizados.",
    button: "Buscar trabajos",
  },
];

export function RoleSelector() {
  const router = useRouter();
  const [pendingRole, setPendingRole] = useState<RoleChoice | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function chooseRole(role: RoleChoice, href: string) {
    setPendingRole(role);
    setMessage(null);

    const supabase = getBrowserSupabaseClient();

    if (!supabase) {
      router.push(href);
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      router.push(authHref(href));
      return;
    }

    const { error } = await ensureMarketplaceRole(supabase, role, fullNameFromUser(user));

    if (error) {
      setMessage("No pudimos guardar tu rol. Intenta de nuevo.");
      setPendingRole(null);
      return;
    }

    router.push(href);
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {choices.map((choice) => {
        const Icon = choice.icon;
        const isPending = pendingRole === choice.role;

        return (
          <article className="ej-card p-5" key={choice.role}>
            <Icon aria-hidden="true" className="text-[var(--ej-accent)]" />
            <h2 className="mt-4 text-xl font-black">{choice.title}</h2>
            <p className="ej-muted mt-2 text-sm leading-6">{choice.text}</p>
            <button
              className="focus-ring ej-btn-primary mt-4 text-sm disabled:cursor-not-allowed disabled:opacity-60"
              disabled={pendingRole !== null}
              onClick={() => void chooseRole(choice.role, choice.href)}
              type="button"
            >
              <ChevronRight aria-hidden="true" size={18} />
              {isPending ? "Guardando..." : choice.button}
            </button>
          </article>
        );
      })}
      {message ? <p className="rounded-2xl border border-[rgba(255,90,120,0.28)] bg-[var(--ej-danger-soft)] p-3 text-sm font-bold text-[#ffb4c2] md:col-span-2">{message}</p> : null}
    </div>
  );
}
