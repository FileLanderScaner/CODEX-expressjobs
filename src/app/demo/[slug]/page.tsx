import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";

const demos: Record<string, { title: string; text: string; examples: string[] }> = {
  peluqueria: {
    title: "Demo peluqueria",
    text: "Ejemplo editorial para validar publicacion de servicios de peluqueria sin presentar datos como operaciones reales.",
    examples: ["Corte a domicilio", "Peinado para evento", "Coloracion con coordinacion previa"],
  },
  estetica: {
    title: "Demo estetica",
    text: "Ejemplo de como una profesional puede explicar un servicio y recibir consultas manuales.",
    examples: ["Manicuria", "Limpieza facial", "Depilacion con agenda previa"],
  },
  "tecnico-reparaciones": {
    title: "Demo tecnico reparaciones",
    text: "Ejemplo para trabajos de reparacion simples, con alcance y seguridad claros.",
    examples: ["Reparacion menor", "Diagnostico en domicilio", "Instalacion basica"],
  },
  limpieza: {
    title: "Demo limpieza",
    text: "Ejemplo de publicacion de tareas de limpieza con ubicacion aproximada y presupuesto acordado.",
    examples: ["Limpieza puntual", "Limpieza post mudanza", "Ayuda por horas"],
  },
  delivery: {
    title: "Demo delivery",
    text: "Ejemplo de tareas de reparto local sin prometer tiempos garantizados ni pagos en app.",
    examples: ["Entrega barrial", "Retiro de paquete", "Mandado corto"],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const demo = demos[slug];
  return {
    title: `${demo?.title ?? "Demo"} | Trabajos Rapidos`,
    description: demo?.text ?? "Demo de Trabajos Rapidos.",
  };
}

export function generateStaticParams() {
  return Object.keys(demos).map((slug) => ({ slug }));
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params;
  const demo = demos[slug];

  if (!demo) {
    notFound();
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-sm font-bold uppercase text-[var(--brand)]">Demo no transaccional</p>
        <h1 className="mt-2 text-3xl font-black">{demo.title}</h1>
        <p className="mt-4 leading-7 text-[var(--muted)]">{demo.text}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {demo.examples.map((example) => (
            <article className="rounded-md border border-[var(--line)] bg-white p-4" key={example}>
              <h2 className="text-lg font-black">{example}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Contenido de muestra. Para operaciones reales se requiere cuenta y flujo Supabase.</p>
            </article>
          ))}
        </div>
        <Link className="focus-ring mt-6 inline-flex rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white" href="/auth">
          Crear cuenta para usar el flujo real
        </Link>
      </main>
    </AppShell>
  );
}
