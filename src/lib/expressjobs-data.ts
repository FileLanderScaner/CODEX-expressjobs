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
export type ApplicationStatus = "submitted" | "viewed" | "shortlisted" | "accepted" | "rejected" | "withdrawn";

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
  "pricing_viewed",
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

export const publicBrand = {
  productName: "Trabajos Rapidos",
  technicalName: "ExpressJobs",
  combinedName: "Trabajos Rapidos by ExpressJobs",
  statusLabel: "Preview privado - no produccion",
} as const;

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

export const pilotOffers = [
  {
    id: "landing-basica",
    name: "Landing basica",
    uyPrice: "1500 UYU",
    usdPrice: "USD 39",
    includes: "Pagina simple + WhatsApp",
    delivery: "24-48 h",
    priority: "Alta",
  },
  {
    id: "landing-completa",
    name: "Landing completa",
    uyPrice: "2500 UYU",
    usdPrice: "USD 69",
    includes: "Textos + servicios + WhatsApp + formulario",
    delivery: "48 h",
    priority: "Alta",
  },
  {
    id: "landing-banner",
    name: "Landing + banner",
    uyPrice: "3500 UYU",
    usdPrice: "USD 99",
    includes: "Landing + banner + publicacion inicial",
    delivery: "48-72 h",
    priority: "Alta",
  },
  {
    id: "banner-fundador-7",
    name: "Banner fundador 7 dias",
    uyPrice: "500 UYU",
    usdPrice: "USD 15",
    includes: "Banner patrocinado + CTA",
    delivery: "Mismo dia",
    priority: "Media",
  },
  {
    id: "banner-fundador-30",
    name: "Banner fundador 30 dias",
    uyPrice: "1500 UYU",
    usdPrice: "USD 39",
    includes: "Banner patrocinado por 30 dias",
    delivery: "Mismo dia",
    priority: "Media",
  },
  {
    id: "publicacion-manual",
    name: "Publicacion manual",
    uyPrice: "500 UYU",
    usdPrice: "USD 15",
    includes: "Publicar tarea y recibir interesados",
    delivery: "Mismo dia",
    priority: "Alta",
  },
  {
    id: "publicacion-filtro",
    name: "Publicacion + filtro",
    uyPrice: "1000 UYU",
    usdPrice: "USD 29",
    includes: "Publicacion + seleccion inicial",
    delivery: "24 h",
    priority: "Alta",
  },
  {
    id: "urgente-24h",
    name: "Urgente 24 h",
    uyPrice: "1500 UYU",
    usdPrice: "USD 39",
    includes: "Coordinacion prioritaria",
    delivery: "24 h",
    priority: "Alta",
  },
] as const;

export type PilotOffer = (typeof pilotOffers)[number];

export const pilotOfferDisclaimer =
  "Precios piloto sujetos a validacion manual. Pagos reales online no estan activos; toda coordinacion se confirma por WhatsApp o canal privado sin checkout live.";

export const pilotSalesCopy = {
  main:
    "Hola, estoy lanzando ExpressJobs y estoy tomando los primeros clientes con precio piloto. Hago paginas simples con boton a WhatsApp desde $1500 UYU, banners desde $500 UYU y publicacion de trabajos rapidos desde $500 UYU. Si queres, te preparo una muestra rapida con tu negocio.",
  status:
    "Estoy lanzando ExpressJobs. Esta semana tomo pocos clientes para paginas simples, banners para comercios y publicacion de trabajos rapidos. Precios piloto desde $500 UYU. Escribime INFO.",
  workPost:
    "Estoy probando ExpressJobs, un servicio para publicar trabajos rapidos y conseguir interesados por WhatsApp. Te ayudo a ordenar el aviso y recibir interesados desde $500 UYU.",
} as const;

export const monetizationOptions = pilotOffers.map((offer) => offer.name);

export const pricingPlans = [
  {
    title: "Gratis",
    price: "UYU 0",
    badge: "MVP",
    description: "Para probar publicacion y busqueda basica en piloto controlado.",
    features: ["Publicar o buscar tareas limitadas", "Postulacion basica", "Perfil basico", "WhatsApp share"],
  },
  {
    title: "Premium trabajador",
    price: "Proximamente",
    badge: "Propuesta inicial",
    description: "Inspirado en el prototipo, pero sin cobro real ni checkout live.",
    features: ["Perfil destacado", "Mas postulaciones", "Alertas tempranas", "Menor comision futura", "Soporte prioritario"],
  },
  {
    title: "Comision",
    price: "15% sugerido",
    badge: "No activo",
    description: "Modelo documentado para trabajos completados cuando exista proveedor de pagos aprobado.",
    features: ["Solo para trabajos completados", "Desactivado en MVP", "Requiere legal/pagos/disputas", "Sin credenciales live"],
  },
] as const;
