import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const migrationsDir = join(process.cwd(), "supabase/migrations");
const migration = readFileSync(join(migrationsDir, "202605120001_expressjobs_mvp_schema.sql"), "utf8");
const allMigrations = readdirSync(migrationsDir)
  .filter((file) => file.endsWith(".sql"))
  .sort()
  .map((file) => readFileSync(join(migrationsDir, file), "utf8"))
  .join("\n");

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
  "applications_update_client_only",
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
    expect(allMigrations.toLowerCase()).not.toContain("disable row level security");
    expect(allMigrations.toLowerCase()).not.toContain("ahorroya");
    expect(allMigrations.toLowerCase()).not.toContain("using (true)");
    expect(allMigrations.toLowerCase()).not.toContain("with check (true)");
  });

  it("keeps private messages limited to accepted job participants", () => {
    const participantFunction = migration.slice(
      migration.indexOf("create or replace function public.ej_is_job_participant"),
      migration.indexOf("drop policy if exists \"profiles_select_own_or_admin\""),
    );

    expect(participantFunction).toContain("accepted_worker_id = auth.uid()");
    expect(participantFunction).not.toContain("public.ej_job_applications");
  });

  it("hardens profile role updates against self-promotion", () => {
    expect(allMigrations).toContain('drop policy if exists "profiles_update_own" on public.ej_profiles');
    expect(allMigrations).toContain('create policy "profiles_update_own_safe_fields" on public.ej_profiles');
    expect(allMigrations).toContain("revoke update on table public.ej_profiles from authenticated");
    expect(allMigrations).toContain(
      "revoke update (id, role, reputation_score, completed_jobs, created_at) on table public.ej_profiles from authenticated",
    );
    expect(allMigrations).toContain("grant update (full_name, phone, city, updated_at) on table public.ej_profiles to authenticated");
    expect(allMigrations).not.toContain("grant update (role)");
    expect(allMigrations).toContain("ej_prevent_profile_role_self_update");
    expect(allMigrations).toContain("revoke execute on function public.ej_prevent_profile_role_self_update() from authenticated");
    expect(allMigrations).toContain("before update of role on public.ej_profiles");
    expect(allMigrations).toContain("auth.role() = 'authenticated'");
    expect(allMigrations).toContain("new.role is distinct from old.role");
  });

  it("keeps ej_is_admin explicitly reviewed because it trusts profile role", () => {
    expect(migration).toContain("create or replace function public.ej_is_admin()");
    expect(migration).toContain("and role = 'admin'");
    expect(allMigrations).toContain("EXPRESSJOBS_PROFILE_ROLE_UPDATE_BLOCKED");
  });

  it("hardens real marketplace applications against self-apply and unsafe public role changes", () => {
    expect(allMigrations).toContain("create or replace function public.ej_set_profile_role");
    expect(allMigrations).toContain("if requested_role not in ('client', 'worker') then");
    expect(allMigrations).toContain("client_id <> auth.uid()");
    expect(allMigrations).toContain("and role = 'worker'");
    expect(allMigrations).toContain("create or replace function public.ej_accept_job_application");
    expect(allMigrations).toContain("security invoker");
    expect(allMigrations).toContain("grant execute on function public.ej_accept_job_application(uuid) to authenticated");
  });
});
