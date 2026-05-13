import type { UserRole } from "@/lib/expressjobs-data";
import { demoProfiles, demoWorkerProfile } from "@/lib/expressjobs-data";
import { trackEvent } from "@/lib/tracking";

export function listProfiles() {
  return demoProfiles;
}

export function selectRole(role: UserRole) {
  return trackEvent("role_selected", { role });
}

export function getWorkerProfile() {
  return demoWorkerProfile;
}
