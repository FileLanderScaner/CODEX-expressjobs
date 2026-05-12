"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

export function TrackingClient() {
  useEffect(() => {
    trackEvent("app_opened", { surface: "web" });
    trackEvent("landing_viewed", { surface: "home" });
  }, []);

  return null;
}
