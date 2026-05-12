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
export type ApplicationStatus = "submitted" | "accepted" | "rejected" | "withdrawn";

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
  clientName: string;
  acceptedWorkerId?: string;
  description: string;
};

export const featuredJobs: FeaturedJob[] = [
  {
    id: "ej-demo-001",
    title: "Ayuda para mudanza chica",
    location: "Cordón, Montevideo",
    budget: "UYU 1.800",
    status: "open",
    category: "Mudanzas",
    clientName: "Lucia Pereira",
    description: "Subir cajas y muebles chicos desde un apartamento a una camioneta.",
  },
  {
    id: "ej-demo-002",
    title: "Instalar soporte de TV",
    location: "Pocitos, Montevideo",
    budget: "UYU 1.200",
    status: "applied",
    category: "Reparaciones",
    clientName: "Mateo Silva",
    description: "Instalar soporte fijo para TV de 55 pulgadas en pared de ladrillo.",
  },
  {
    id: "ej-demo-003",
    title: "Fotos para catalogo de emprendimiento",
    location: "Centro, Montevideo",
    budget: "UYU 2.500",
    status: "accepted",
    category: "Eventos",
    clientName: "Cafe Rio",
    acceptedWorkerId: "worker-demo-001",
    description: "Sacar fotos simples de productos para catalogo y redes.",
  },
];

export const demoProfiles = [
  {
    id: "client-demo-001",
    role: "client" satisfies UserRole,
    fullName: "Lucia Pereira",
    city: "Montevideo",
    reputationScore: 4.8,
    completedJobs: 6,
  },
  {
    id: "worker-demo-001",
    role: "worker" satisfies UserRole,
    fullName: "Diego Ramos",
    city: "Montevideo",
    reputationScore: 4.9,
    completedJobs: 18,
  },
  {
    id: "admin-demo-001",
    role: "admin" satisfies UserRole,
    fullName: "Admin ExpressJobs",
    city: "Montevideo",
    reputationScore: 5,
    completedJobs: 0,
  },
];

export const demoWorkerProfile = {
  userId: "worker-demo-001",
  headline: "Ayudante confiable para mudanzas y reparaciones chicas",
  bio: "Disponible en Montevideo para tareas de pocas horas, coordinacion por chat y cierre con reseña.",
  skills: ["Mudanzas", "Reparaciones", "Delivery local"],
  serviceRadiusKm: 12,
  hourlyRateUyu: 450,
};

type DemoApplication = {
  id: string;
  jobId: string;
  workerId: string;
  workerName: string;
  message: string;
  proposedAmount: string;
  status: ApplicationStatus;
  reputationScore: number;
};

export const demoApplications: DemoApplication[] = [
  {
    id: "application-demo-001",
    jobId: "ej-demo-001",
    workerId: "worker-demo-001",
    workerName: "Diego Ramos",
    message: "Puedo ir hoy de tarde con carro de carga chico.",
    proposedAmount: "UYU 1.700",
    status: "submitted" satisfies ApplicationStatus,
    reputationScore: 4.9,
  },
  {
    id: "application-demo-002",
    jobId: "ej-demo-002",
    workerId: "worker-demo-001",
    workerName: "Diego Ramos",
    message: "Tengo herramientas y experiencia instalando soportes.",
    proposedAmount: "UYU 1.200",
    status: "accepted" satisfies ApplicationStatus,
    reputationScore: 4.9,
  },
];

export const demoMessages = [
  {
    id: "message-demo-001",
    jobId: "ej-demo-003",
    senderName: "Cafe Rio",
    body: "Necesitamos fotos horizontales y verticales.",
    createdAt: "2026-05-12T18:00:00.000Z",
  },
  {
    id: "message-demo-002",
    jobId: "ej-demo-003",
    senderName: "Diego Ramos",
    body: "Perfecto, puedo entregar una carpeta compartida al terminar.",
    createdAt: "2026-05-12T18:05:00.000Z",
  },
];

export const demoReviews = [
  {
    id: "review-demo-001",
    jobId: "ej-demo-003",
    reviewerName: "Cafe Rio",
    revieweeName: "Diego Ramos",
    rating: 5,
    comment: "Coordino rapido y cumplio con lo acordado.",
  },
];

export const demoEvents = [
  {
    id: "event-demo-001",
    jobId: "ej-demo-001",
    eventName: "job_created",
    actorName: "Lucia Pereira",
    createdAt: "2026-05-12T17:30:00.000Z",
  },
  {
    id: "event-demo-002",
    jobId: "ej-demo-002",
    eventName: "job_application_accepted",
    actorName: "Mateo Silva",
    createdAt: "2026-05-12T18:20:00.000Z",
  },
];

export const monetizationOptions = [
  "Comision sugerida del 15% sobre trabajos completados",
  "Trabajos destacados para clientes",
  "Premium trabajador con mayor visibilidad",
  "Plan empresa para volumen recurrente",
] as const;
