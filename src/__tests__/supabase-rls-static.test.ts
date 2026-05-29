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

const finalRoleRpcMigration = readFileSync(
  join(migrationsDir, "20260525193000_revoke_profile_role_rpc_from_authenticated.sql"),
  "utf8",
);
const publicCallsAdminMigration = readFileSync(
  join(migrationsDir, "20260529024000_public_calls_admin_review_queue.sql"),
  "utf8",
);
const publicCallsAdminActionEventsMigration = readFileSync(
  join(migrationsDir, "20260529040500_public_calls_admin_action_events.sql"),
  "utf8",
);
const marketplaceLib = readFileSync(join(process.cwd(), "src/lib/marketplace.ts"), "utf8");
const roleApiRoute = readFileSync(join(process.cwd(), "src/app/api/profile/set-role/route.ts"), "utf8");

const requiredTables = [
  "ej_profiles",
  "ej_worker_profiles",
  "ej_jobs",
  "ej_job_applications",
  "ej_job_messages",
  "ej_job_reviews",
  "ej_job_events",
  "ej_company_profiles",
  "ej_job_reports",
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
  "company_profiles_insert_own_client",
  "company_profiles_update_own_client",
  "job_reports_select_reporter_owner_admin",
];

describe("ExpressJobs Supabase RLS migration", () => {
  it("creates all required ExpressJobs tables with the ej_ prefix", () => {
    for (const table of requiredTables) {
      expect(allMigrations).toContain(`public.${table}`);
    }
  });

  it("enables RLS on every required table", () => {
    for (const table of requiredTables) {
      expect(allMigrations).toContain(`alter table public.${table} enable row level security`);
    }
  });

  it("defines the required policy names", () => {
    for (const policy of requiredPolicies) {
      expect(allMigrations).toContain(policy);
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
    expect(allMigrations).toContain("revoke execute on function public.ej_prevent_profile_role_self_update() from public");
    expect(allMigrations).toContain("revoke execute on function public.ej_prevent_profile_role_self_update() from authenticated");
    expect(allMigrations).toContain("before update of role on public.ej_profiles");
    expect(allMigrations).toContain("auth.role() = 'authenticated'");
    expect(allMigrations).toContain("new.role is distinct from old.role");
  });

  it("keeps ej_is_admin explicitly reviewed because it trusts profile role", () => {
    expect(migration).toContain("create or replace function public.ej_is_admin()");
    expect(migration).toContain("and role = 'admin'");
    expect(allMigrations).toContain("EXPRESSJOBS_PROFILE_ROLE_UPDATE_BLOCKED");
    expect(allMigrations).toContain("create schema if not exists private");
    expect(allMigrations).toContain("create or replace function private.ej_is_admin()");
    expect(allMigrations).toContain("revoke execute on function public.ej_is_admin() from authenticated");
    expect(allMigrations).toContain("profile_id = (select auth.uid()) or (select private.ej_is_admin())");
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

  it("moves role selection behind a server-only RPC and revokes direct client execution", () => {
    expect(allMigrations).toContain("create or replace function public.ej_set_profile_role");
    expect(allMigrations).toContain("security definer");
    expect(allMigrations).toContain("set search_path = public");
    expect(allMigrations).toContain("requested_role not in ('client', 'worker')");
    expect(allMigrations).toContain("EXPRESSJOBS_ROLE_CHANGE_LOCKED");
    expect(allMigrations).not.toContain("requested_role in ('admin'");

    expect(finalRoleRpcMigration).toContain("create or replace function public.ej_set_profile_role_for_user");
    expect(finalRoleRpcMigration).toContain("target_user_id uuid");
    expect(finalRoleRpcMigration).toContain(
      "revoke execute on function public.ej_set_profile_role(text, text) from authenticated",
    );
    expect(finalRoleRpcMigration).toContain(
      "revoke execute on function public.ej_set_profile_role_for_user(uuid, text, text) from authenticated",
    );
    expect(finalRoleRpcMigration).toContain(
      "grant execute on function public.ej_set_profile_role_for_user(uuid, text, text) to service_role",
    );
    expect(finalRoleRpcMigration).not.toContain(
      "grant execute on function public.ej_set_profile_role(text, text) to authenticated",
    );
    expect(finalRoleRpcMigration).not.toContain(
      "grant execute on function public.ej_set_profile_role_for_user(uuid, text, text) to authenticated",
    );

    expect(marketplaceLib).toContain('fetch("/api/profile/set-role"');
    expect(marketplaceLib).not.toContain('supabase.rpc("ej_set_profile_role"');
    expect(roleApiRoute).toContain("SUPABASE_SERVICE_ROLE_KEY");
    expect(roleApiRoute).toContain('adminSupabase.rpc("ej_set_profile_role_for_user"');
  });

  it("requires client role for job publishing after role RPC hardening", () => {
    expect(allMigrations).toContain('drop policy if exists "jobs_client_insert" on public.ej_jobs');
    expect(allMigrations).toContain("and role = 'client'");
  });

  it("adds company profiles and job reports without opening broad public RLS policies", () => {
    expect(allMigrations).toContain("create table if not exists public.ej_company_profiles");
    expect(allMigrations).toContain("create table if not exists public.ej_job_reports");
    expect(allMigrations).toContain("alter table public.ej_company_profiles enable row level security");
    expect(allMigrations).toContain("alter table public.ej_job_reports enable row level security");
    expect(allMigrations).toContain("profile_id = auth.uid()");
    expect(allMigrations).toContain("reporter_profile_id = auth.uid()");
    expect(allMigrations).toContain("'shortlisted'");
    expect(allMigrations).toContain("'viewed'");
  });

  it("prepares Supabase Advisor performance closeout without disabling RLS", () => {
    expect(allMigrations).toContain("create index if not exists ej_job_messages_job_id_idx");
    expect(allMigrations).toContain("create index if not exists ej_job_messages_sender_id_idx");
    expect(allMigrations).toContain("create index if not exists ej_jobs_client_id_idx");
    expect(allMigrations).toContain("create index if not exists ej_payment_records_user_id_idx");
    expect(allMigrations).toContain("create policy \"job_messages_select_participants_or_admin\"");
    expect(allMigrations).toContain("create policy \"job_messages_update_admin_only\"");
    expect(allMigrations).toContain("create policy \"job_messages_delete_admin_only\"");
    expect(allMigrations).toContain("or (select private.ej_is_admin())");
    expect(allMigrations).toContain('drop policy if exists "admin_audit_admin_only" on public.ej_admin_audit_logs');
    expect(allMigrations).toContain('drop policy if exists "categories_select_active" on public.ej_categories');
  });

  it("adds public-call review queue tables behind admin RLS", () => {
    expect(publicCallsAdminMigration).toContain("create table if not exists public.public_call_sources");
    expect(publicCallsAdminMigration).toContain("create table if not exists public.public_call_drafts");
    expect(publicCallsAdminMigration).toContain("create table if not exists public.public_call_review_events");
    expect(publicCallsAdminMigration).toContain("alter table public.public_call_sources enable row level security");
    expect(publicCallsAdminMigration).toContain("alter table public.public_call_drafts enable row level security");
    expect(publicCallsAdminMigration).toContain("alter table public.public_call_review_events enable row level security");
    expect(publicCallsAdminMigration).toContain('create policy "public_call_sources_admin_insert"');
    expect(publicCallsAdminMigration).toContain('create policy "public_call_sources_admin_update"');
    expect(publicCallsAdminMigration).toContain('create policy "public_call_drafts_admin_insert"');
    expect(publicCallsAdminMigration).toContain('create policy "public_call_drafts_admin_update"');
    expect(publicCallsAdminMigration).toContain('create policy "public_call_review_events_admin_insert"');
    expect(publicCallsAdminMigration).toContain("(select private.ej_is_admin())");
    expect(publicCallsAdminMigration).toContain("review_status = 'approved'");
    expect(publicCallsAdminMigration).toContain("publication_status = 'published'");
    expect(publicCallsAdminMigration).toContain("publication_status <> 'published' or review_status = 'approved'");
    expect(publicCallsAdminMigration).not.toContain("for delete");
    expect(publicCallsAdminMigration).not.toContain("grant delete");
  });

  it("keeps public-call queue as review preparation, not scraping automation", () => {
    const lower = [publicCallsAdminMigration, publicCallsAdminActionEventsMigration].join("\n").toLowerCase();

    expect(lower).toContain("no scraping");
    expect(lower).toContain("no crawler");
    expect(lower).toContain("no cron");
    expect(lower).not.toContain("http_get");
    expect(lower).not.toContain("pg_cron");
    expect(lower).not.toContain("cron.schedule");
    expect(lower).not.toContain("service_role");
    expect(lower).not.toContain("using (true)");
    expect(lower).not.toContain("with check (true)");
  });

  it("allows explicit public-call admin action audit events without opening RLS", () => {
    expect(publicCallsAdminActionEventsMigration).toContain("drop constraint if exists public_call_review_events_event_type_allowed");
    expect(publicCallsAdminActionEventsMigration).toContain("'draft_submitted'");
    expect(publicCallsAdminActionEventsMigration).toContain("'draft_approved'");
    expect(publicCallsAdminActionEventsMigration).toContain("'draft_rejected'");
    expect(publicCallsAdminActionEventsMigration).toContain("'draft_published'");
    expect(publicCallsAdminActionEventsMigration).toContain("'draft_archived'");
    expect(publicCallsAdminActionEventsMigration.toLowerCase()).not.toContain("disable row level security");
    expect(publicCallsAdminActionEventsMigration.toLowerCase()).not.toContain("grant delete");
  });
});
