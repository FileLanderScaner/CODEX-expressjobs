import { ArrowRight, BriefcaseBusiness, ClipboardCheck, FileSearch, FileText, FolderCheck, ListOrdered, MessageSquareText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { productionStatus } from "@/lib/env";
import { publicSalesContact } from "@/lib/monetization/monetization-config";

const serviceWhatsAppText = encodeURIComponent(
  "Hola Ronald, quiero consultar por el servicio Caso Claro para ordenar documentos y preparar mi caso.",
);

const serviceWhatsappHref = `https://wa.me/${publicSalesContact.whatsappNumber}?text=${serviceWhatsAppText}`;

const services = [
  {
    icon: FolderCheck,
    title: "Organizacion de documentos y pruebas",
    text: "Ordeno recibos, comprobantes, capturas, mensajes, correos, contratos, transferencias y constancias para que el caso sea entendible.",
  },
  {
    icon: ListOrdered,
    title: "Cronologia de hechos",
    text: "Armo una linea de tiempo con fechas, personas, empresas, documentos asociados, contradicciones y puntos que faltan respaldar.",
  },
  {
    icon: FileText,
    title: "Informe para abogado, contador o asesor",
    text: "Transformo informacion desordenada en un informe claro con resumen ejecutivo, antecedentes, hechos relevantes y preguntas sugeridas.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Revision documental laboral",
    text: "Organizo recibos, pagos, BPS, licencias, subsidios, cambios de horario, mensajes laborales y diferencias visibles para revision profesional.",
  },
  {
    icon: FileSearch,
    title: "Investigacion publica de empresas y vinculos",
    text: "Reuno informacion publica, fuentes abiertas y documentos aportados para mapear empresas, nombres comerciales, socios, direcciones y conexiones visibles.",
  },
  {
    icon: MessageSquareText,
    title: "Redaccion de comunicaciones formales",
    text: "Preparo borradores de cartas, mensajes, reclamos iniciales, descargos o resumenes para presentar la situacion con claridad.",
  },
] as const;

const packages = [
  {
    name: "Orden inicial",
    price: "UYU 1.500",
    text: "Revision rapida, resumen de 1 a 3 paginas, documentos clave y checklist de informacion faltante.",
  },
  {
    name: "Informe completo",
    price: "UYU 4.500",
    text: "Cronologia, resumen ejecutivo, analisis documental basico, contradicciones y preguntas para consulta profesional.",
  },
  {
    name: "Carpeta avanzada",
    price: "Desde UYU 8.000",
    text: "Carpeta digital organizada, indice probatorio, mapa de vinculos, informe extendido y observaciones estrategicas.",
  },
] as const;

export default function ServiciosPage() {
  return (
    <AppShell>
      <main className="ej-page">
        <section className="relative isolate overflow-hidden py-14 lg:py-20">
          <div className="hero-grid-pattern absolute inset-0 -z-10 opacity-35" />
          <div className="ej-container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="ej-badge">Servicios ofrecidos</p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl">
                Caso Claro: prepara tu caso con documentos ordenados.
              </h1>
              <p className="ej-muted mt-6 max-w-2xl text-lg leading-8">
                Ayudo a trabajadores, clientes y pequenos emprendedores a transformar documentos, mensajes, recibos y pruebas desordenadas en un informe claro para consultar mejor con un abogado, contador o asesor.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="focus-ring ej-btn-primary text-sm uppercase tracking-[0.12em]" href={serviceWhatsappHref}>
                  Consultar por WhatsApp <ArrowRight aria-hidden="true" size={18} />
                </a>
                <Link className="focus-ring ej-btn-secondary text-sm uppercase tracking-[0.12em]" href="/#como-funciona">
                  Ver plataforma
                </Link>
              </div>
              <div className="ej-glass mt-6 max-w-2xl p-4 text-sm leading-6">
                <strong className="text-white">Aviso:</strong> este servicio es apoyo documental, organizacion de informacion e investigacion publica. No sustituye asesoramiento legal, contable ni notarial. Produccion publica permanece <span className="font-black text-red-200">{productionStatus()}</span>.
              </div>
            </div>

            <div className="ej-glass p-5">
              <div className="rounded-lg border border-[var(--ej-border)] bg-white/[0.04] p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">Promesa comercial</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight">
                  Llegar a una consulta profesional con el caso claro ahorra tiempo, evita olvidos y mejora la explicacion.
                </h2>
                <div className="mt-6 grid gap-3">
                  {[
                    "Orden de hechos y documentos",
                    "Pruebas fuertes, medias y debiles",
                    "Preguntas concretas para el profesional",
                    "Direccion exacta y datos sensibles tratados con reserva",
                  ].map((item) => (
                    <div className="flex gap-3 rounded-lg border border-[var(--ej-border)] bg-white/[0.05] p-4" key={item}>
                      <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--ej-success)]" size={20} />
                      <p className="ej-muted text-sm font-semibold leading-6">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ej-dark-section py-12">
          <div className="ej-container">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="ej-badge">Que incluye</p>
                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Servicios para ordenar, analizar y presentar mejor un caso</h2>
              </div>
              <p className="ej-muted max-w-xl text-sm leading-6">
                Pensado para casos laborales, comerciales, administrativos o situaciones con muchos documentos y poca claridad.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article className="ej-card p-6 transition hover:-translate-y-1" key={service.title}>
                  <service.icon aria-hidden="true" className="text-[var(--ej-accent)]" size={28} />
                  <h3 className="mt-4 text-xl font-black tracking-tight">{service.title}</h3>
                  <p className="ej-muted mt-3 text-sm leading-6">{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ej-container py-12">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="ej-badge">Paquetes</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">Precios simples para vender rapido</h2>
              <p className="ej-muted mt-4 text-sm leading-6">
                Estos precios son iniciales para validar demanda. El alcance final depende de cantidad de documentos, urgencia y complejidad.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {packages.map((item) => (
                <article className="ej-card flex min-h-[260px] flex-col justify-between p-6" key={item.name}>
                  <div>
                    <p className="ej-chip text-[11px] uppercase tracking-[0.16em]">{item.name}</p>
                    <h3 className="mt-4 text-3xl font-black tracking-tight text-white">{item.price}</h3>
                    <p className="ej-muted mt-4 text-sm leading-6">{item.text}</p>
                  </div>
                  <a className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-emerald-200" href={serviceWhatsappHref}>
                    Consultar <ArrowRight aria-hidden="true" size={16} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ej-dark-section py-12">
          <div className="ej-container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="ej-badge">Para empezar</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">Mandame un resumen y te digo que paquete conviene.</h2>
              <p className="ej-muted mt-4 max-w-2xl text-sm leading-6">
                Envia tipo de caso, objetivo, documentos disponibles, fechas importantes y nivel de urgencia. No envies claves, contrasenas ni datos sensibles innecesarios.
              </p>
            </div>
            <a className="focus-ring ej-btn-primary text-sm uppercase tracking-[0.12em]" href={serviceWhatsappHref}>
              Consultar ahora <ClipboardCheck aria-hidden="true" size={18} />
            </a>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
