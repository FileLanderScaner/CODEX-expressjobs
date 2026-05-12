import { describe, expect, it } from "vitest";
import { jobStatuses, trackingEvents } from "@/lib/expressjobs-data";
import { isTrackingEventName } from "@/lib/tracking";
import { buildWhatsAppShareUrl } from "@/lib/whatsapp";

describe("ExpressJobs MVP constants", () => {
  it("keeps the required job lifecycle states", () => {
    expect(jobStatuses).toEqual([
      "draft",
      "open",
      "applied",
      "accepted",
      "in_progress",
      "completed",
      "cancelled",
      "disputed",
    ]);
  });

  it("includes required tracking events", () => {
    expect(trackingEvents).toContain("job_application_accepted");
    expect(trackingEvents).toContain("whatsapp_share_clicked");
    expect(isTrackingEventName("message_sent")).toBe(true);
    expect(isTrackingEventName("unknown")).toBe(false);
  });

  it("builds a safe WhatsApp share URL", () => {
    expect(buildWhatsAppShareUrl("Trabajo ExpressJobs")).toBe("https://wa.me/?text=Trabajo%20ExpressJobs");
  });
});
