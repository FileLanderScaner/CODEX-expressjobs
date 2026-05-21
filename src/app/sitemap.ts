import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";

const publicRoutes = [
  "/",
  "/ofertas",
  "/landing-negocios",
  "/sponsor",
  "/pricing",
  "/precios",
  "/como-funciona",
  "/seguridad",
  "/contacto",
  "/auth",
  "/login",
  "/signup",
  "/legal/privacy",
  "/legal/terms",
  "/demo/peluqueria",
  "/demo/estetica",
  "/demo/tecnico-reparaciones",
  "/demo/limpieza",
  "/demo/delivery",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${publicEnv.NEXT_PUBLIC_APP_URL}${route}`,
    lastModified: new Date("2026-05-21"),
  }));
}
