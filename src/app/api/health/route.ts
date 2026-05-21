import { okJson } from "@/lib/api";
import { isSupabaseConfigured, productionStatus, publicEnv } from "@/lib/env";

export function GET() {
  return okJson({
    app: "ExpressJobs / Trabajos Rapidos",
    env: publicEnv.APP_ENV,
    productionStatus: productionStatus(),
    supabaseConfigured: isSupabaseConfigured(),
    paymentsEnabled: process.env.ENABLE_PAYMENTS === "true",
    aiAgentsEnabled: process.env.ENABLE_AI_AGENTS === "true",
  });
}
