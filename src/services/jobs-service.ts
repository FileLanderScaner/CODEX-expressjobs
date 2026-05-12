import type { JobStatus } from "@/lib/expressjobs-data";
import { featuredJobs } from "@/lib/expressjobs-data";
import { trackEvent } from "@/lib/tracking";

export function listOpenJobs() {
  return featuredJobs.filter((job) => job.status === "open" || job.status === "applied");
}

export function listClientJobs() {
  return featuredJobs;
}

export function listWorkerAcceptedJobs() {
  return featuredJobs.filter((job) => job.status === "accepted" || job.status === "in_progress");
}

export function getJobById(id: string) {
  return featuredJobs.find((job) => job.id === id) ?? featuredJobs[0];
}

export function createJobDraft(input: { title: string; category: string; location: string; budget: string }) {
  return trackEvent("job_created", {
    title: input.title,
    category: input.category,
    location: input.location,
    budget: input.budget,
  });
}

export function viewJob(id: string) {
  return trackEvent("job_viewed", { job_id: id });
}

export function changeJobStatus(id: string, status: JobStatus) {
  const eventName = status === "in_progress" ? "job_started" : status === "completed" ? "job_completed" : "job_viewed";
  return trackEvent(eventName, { job_id: id, status });
}
