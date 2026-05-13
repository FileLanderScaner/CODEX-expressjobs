import { demoMessages } from "@/lib/expressjobs-data";
import { trackEvent } from "@/lib/tracking";

export function listMessagesForJob(jobId: string) {
  return demoMessages.filter((message) => message.jobId === jobId);
}

export function sendMessage(jobId: string, body: string) {
  return trackEvent("message_sent", { job_id: jobId, length: body.length });
}
