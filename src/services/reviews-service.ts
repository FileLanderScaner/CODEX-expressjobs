import { demoReviews } from "@/lib/expressjobs-data";
import { trackEvent } from "@/lib/tracking";

export function listReviewsForJob(jobId: string) {
  return demoReviews.filter((review) => review.jobId === jobId);
}

export function createReview(jobId: string, rating: number) {
  return trackEvent("review_created", { job_id: jobId, rating });
}
