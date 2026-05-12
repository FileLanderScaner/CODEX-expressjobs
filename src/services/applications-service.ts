import { demoApplications } from "@/lib/expressjobs-data";
import { trackEvent } from "@/lib/tracking";

export function listApplicationsForJob(jobId: string) {
  return demoApplications.filter((application) => application.jobId === jobId);
}

export function listWorkerApplications(workerId: string) {
  return demoApplications.filter((application) => application.workerId === workerId);
}

export function createApplication(jobId: string) {
  return trackEvent("job_application_created", { job_id: jobId });
}

export function acceptApplication(applicationId: string) {
  return trackEvent("job_application_accepted", { application_id: applicationId });
}
