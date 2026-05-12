import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const migration = readFileSync(
  join(process.cwd(), "supabase/migrations/202605120001_expressjobs_mvp_schema.sql"),
  "utf8",
);

const requiredTables = [
  "ej_profiles",
  "ej_worker_profiles",
  "ej_jobs",
  "ej_job_applications",
  "ej_job_messages",
  "ej_job_reviews",
  "ej_job_events",
  "ej_categories",
  "ej_payment_records",
  "ej_admin_audit_logs",
];

const requiredPolicies = [
  "profiles_select_own_or_admin",
  "profiles_insert_own",
  "profiles_update_own",
  "worker_profiles_select_available",
  "worker_profiles_manage_own",
  "jobs_select_visible",
  "jobs_client_insert",
  "jobs_client_update",
  "applications_worker_insert",
  "applications_select_parties",
  "applications_update_parties",
  "messages_select_participants",
  "messages_insert_participants",
  "reviews_insert_completed_participants",
  "events_insert_authenticated",
  "events_select_participants",
  "payment_records_select_own_or_admin",
  "admin_audit_admin_only",
];

describe("ExpressJobs Supabase RLS migration", () => {
  it("creates all required ExpressJobs tables with the ej_ prefix", () => {
    for (const table of requiredTables) {
      expect(migration).toContain(`public.${table}`);
    }
  });

  it("enables RLS on every required table", () => {
    for (const table of requiredTables) {
      expect(migration).toContain(`alter table public.${table} enable row level security`);
    }
  });

  it("defines the required policy names", () => {
    for (const policy of requiredPolicies) {
      expect(migration).toContain(policy);
    }
  });

  it("does not disable RLS or reference AhorroYA tables", () => {
    expect(migration.toLowerCase()).not.toContain("disable row level security");
    expect(migration.toLowerCase()).not.toContain("ahorroya");
  });
});
