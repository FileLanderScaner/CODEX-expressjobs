import { AppShell } from "@/components/app-shell";
import { RoleSelector } from "@/components/role-selector";

export default function RolePage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-black">Seleccion de rol</h1>
        <div className="mt-6">
          <RoleSelector />
        </div>
      </main>
    </AppShell>
  );
}
