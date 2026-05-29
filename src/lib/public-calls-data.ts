export type PublicCall = {
  id: string;
  title: string;
  organization: string;
  sourceName: string;
  sourceUrl: string;
  location: string;
  category: string;
  status: "abierto" | "proximo-cierre" | "referencia";
  deadlineLabel: string;
  summary: string;
  requirements: string[];
};

export const publicCallStatusLabels: Record<PublicCall["status"], string> = {
  abierto: "Abierto a verificar",
  "proximo-cierre": "Cierre proximo a verificar",
  referencia: "Referencia",
};

export const publicCalls: PublicCall[] = [
  {
    id: "referencia-uruguay-concursa",
    title: "Referencia: llamados de la Administracion Publica",
    organization: "Organismos publicos de Uruguay",
    sourceName: "Portal oficial Uruguay Concursa",
    sourceUrl: "https://uruguayconcursa.gub.uy/",
    location: "Uruguay",
    category: "Administracion publica",
    status: "referencia",
    deadlineLabel: "Verificar cierre en la fuente oficial",
    summary:
      "Referencia general al portal oficial donde se publican llamados publicos. Los datos concretos deben confirmarse siempre en el sitio oficial antes de postular.",
    requirements: ["Usuario en portal oficial si corresponde", "CV actualizado", "Documentos y constancias segun bases"],
  },
  {
    id: "referencia-gub-llamados",
    title: "Referencia: llamados y concursos publicos",
    organization: "Sitio oficial gub.uy",
    sourceName: "gub.uy",
    sourceUrl: "https://www.gub.uy/llamados-concursos-publicos",
    location: "Uruguay",
    category: "Concursos publicos",
    status: "referencia",
    deadlineLabel: "Fechas sujetas a la fuente oficial",
    summary:
      "Punto de consulta general para llamados y concursos publicos. ExpressJobs lo muestra como referencia para ordenar la preparacion documental.",
    requirements: ["Leer bases completas", "Revisar incompatibilidades", "Preparar carpeta documental"],
  },
  {
    id: "referencia-onsc-uruguay-concursa",
    title: "Referencia: servicio Uruguay Concursa",
    organization: "Oficina Nacional del Servicio Civil",
    sourceName: "ONSC / gub.uy",
    sourceUrl: "https://www.gub.uy/oficina-nacional-servicio-civil/tramites-y-servicios/servicios/uruguay-concursa",
    location: "Uruguay",
    category: "Funcion publica",
    status: "referencia",
    deadlineLabel: "Consultar portal oficial",
    summary:
      "Referencia institucional sobre el servicio y acceso a informacion de concursos de la Administracion Publica.",
    requirements: ["Cuenta o acceso oficial si aplica", "Datos personales actualizados", "Documentacion probatoria"],
  },
  {
    id: "referencia-udelar-llamados",
    title: "Referencia: llamados universitarios",
    organization: "Universidad de la Republica",
    sourceName: "Udelar",
    sourceUrl: "https://udelar.edu.uy/portal/llamados/",
    location: "Uruguay",
    category: "Educacion",
    status: "referencia",
    deadlineLabel: "Ver llamados vigentes en fuente oficial",
    summary:
      "Referencia general a llamados universitarios. Cada postulacion debe revisarse en la publicacion oficial correspondiente.",
    requirements: ["Formacion requerida por bases", "Escolaridad o titulos si corresponde", "CV y constancias"],
  },
];

export const publicCallsPilotNotice =
  "Datos de muestra para piloto controlado. Verifica siempre la informacion completa, fechas y requisitos en la fuente oficial.";
