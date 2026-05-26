import { HelpCircle, LogIn, UserRoundCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PrimaryButton } from "@/components/primary-button";
import { RoleSelector } from "@/components/role-selector";

export default function RegisterPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <section className="ej-glass p-6">
          <p className="ej-badge">
            Alta segura
          </p>
          <h1 className="mt-3 text-3xl font-black">Elegir tipo de cuenta</h1>
          <p className="ej-muted mt-3 max-w-3xl leading-7">
            Selecciona el flujo que necesitas y el sistema preparara tu rol seguro en Supabase.
            Si todavia no iniciaste sesion, primero entra con tu cuenta y despues confirma tu rol.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <PrimaryButton href="/auth" icon={LogIn}>
              Ingresar / Crear cuenta
            </PrimaryButton>
            <PrimaryButton href="/como-funciona" icon={HelpCircle}>
              Ver guia
            </PrimaryButton>
            <PrimaryButton href="/role" icon={UserRoundCheck}>
              Elegir rol
            </PrimaryButton>
          </div>
        </section>

        <section className="mt-6">
          <RoleSelector />
        </section>
      </main>
    </AppShell>
  );
}
