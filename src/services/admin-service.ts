import { demoApplications, demoEvents, demoProfiles, featuredJobs } from "@/lib/expressjobs-data";

export function getAdminOverview() {
  return {
    profiles: demoProfiles,
    jobs: featuredJobs,
    applications: demoApplications,
    events: demoEvents,
    disputes: featuredJobs.filter((job) => job.status === "disputed"),
  };
}
