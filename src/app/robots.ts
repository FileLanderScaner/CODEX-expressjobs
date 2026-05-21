import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/ofertas", "/landing-negocios", "/sponsor", "/pricing", "/precios", "/como-funciona", "/seguridad", "/contacto", "/auth"],
        disallow: ["/dashboard", "/admin", "/production-paused", "/auth/diagnostics"],
      },
    ],
    sitemap: `${publicEnv.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
