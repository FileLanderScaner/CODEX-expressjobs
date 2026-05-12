export const jobStatuses = [
  "draft",
  "open",
  "applied",
  "accepted",
  "in_progress",
  "completed",
  "cancelled",
  "disputed",
] as const;

export type JobStatus = (typeof jobStatuses)[number];
export type UserRole = "client" | "worker" | "admin";

export const trackingEvents = [
  "app_opened",
  "landing_viewed",
  "signup_started",
  "signup_completed",
  "role_selected",
  "job_created",
  "job_viewed",
  "job_application_created",
  "job_application_accepted",
  "job_started",
  "job_completed",
  "review_created",
  "message_sent",
  "whatsapp_share_clicked",
  "premium_cta_clicked",
  "commission_info_viewed",
] as const;

export type TrackingEventName = (typeof trackingEvents)[number];

export const categories = [
  "Mudanzas",
  "Limpieza",
  "Reparaciones",
  "Jardineria",
  "Delivery local",
  "Tecnologia",
  "Eventos",
  "Cuidado de mascotas",
] as const;

type FeaturedJob = {
  id: string;
  title: string;
  location: string;
  budget: string;
  status: JobStatus;
  category: string;
};

export const featuredJobs: FeaturedJob[] = [
  {
    id: "ej-demo-001",
    title: "Ayuda para mudanza chica",
    location: "Cordón, Montevideo",
    budget: "UYU 1.800",
    status: "open",
    category: "Mudanzas",
  },
  {
    id: "ej-demo-002",
    title: "Instalar soporte de TV",
    location: "Pocitos, Montevideo",
    budget: "UYU 1.200",
    status: "applied",
    category: "Reparaciones",
  },
  {
    id: "ej-demo-003",
    title: "Fotos para catalogo de emprendimiento",
    location: "Centro, Montevideo",
    budget: "UYU 2.500",
    status: "accepted",
    category: "Eventos",
  },
];

export const monetizationOptions = [
  "Comision sugerida del 15% sobre trabajos completados",
  "Trabajos destacados para clientes",
  "Premium trabajador con mayor visibilidad",
  "Plan empresa para volumen recurrente",
] as const;
