import { trackingEvents, type TrackingEventName } from "@/lib/expressjobs-data";

type TrackingPayload = Record<string, string | number | boolean | null | undefined>;

export function isTrackingEventName(event: string): event is TrackingEventName {
  return trackingEvents.includes(event as TrackingEventName);
}

export function trackEvent(event: TrackingEventName, payload: TrackingPayload = {}) {
  const entry = {
    event,
    payload,
    createdAt: new Date().toISOString(),
  };

  if (typeof window === "undefined") {
    return entry;
  }

  try {
    const existing = window.localStorage.getItem("expressjobs_tracking_events");
    const events = existing ? (JSON.parse(existing) as typeof entry[]) : [];
    events.push(entry);
    window.localStorage.setItem("expressjobs_tracking_events", JSON.stringify(events.slice(-200)));
  } catch {
    window.sessionStorage.setItem("expressjobs_last_tracking_event", JSON.stringify(entry));
  }

  return entry;
}
