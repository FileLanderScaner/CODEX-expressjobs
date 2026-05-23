import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import { createClient } from "@supabase/supabase-js";

for (const envFile of [".env.local", ".env.rls"]) {
  if (existsSync(envFile)) {
    loadEnvFile(envFile);
  }
}

const results = {};
const failures = [];
const createdMessageIds = new Set();

function envAny(...names) {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  return undefined;
}

function safeMessage(error) {
  return String(error?.message ?? error ?? "unknown error").replace(/(password|key|token|secret)=\S+/gi, "$1=[redacted]");
}

function record(name, status, details) {
  results[name] = details ? { status, details } : status;
}

function requiredFixtures() {
  const required = {
    NEXT_PUBLIC_SUPABASE_URL: envAny("NEXT_PUBLIC_SUPABASE_URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: envAny("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    APP_ENV: envAny("APP_ENV"),
    CLIENT_EMAIL: envAny("TEST_CLIENT_EMAIL", "EXPRESSJOBS_STAGING_CLIENT_EMAIL"),
    CLIENT_PASSWORD: envAny("TEST_CLIENT_PASSWORD", "EXPRESSJOBS_STAGING_CLIENT_PASSWORD"),
    ACCEPTED_WORKER_EMAIL: envAny("TEST_ACCEPTED_WORKER_EMAIL", "EXPRESSJOBS_STAGING_WORKER_EMAIL"),
    ACCEPTED_WORKER_PASSWORD: envAny("TEST_ACCEPTED_WORKER_PASSWORD", "EXPRESSJOBS_STAGING_WORKER_PASSWORD"),
  };

  return Object.entries(required)
    .filter(([, value]) => !value)
    .map(([name]) => name);
}

function buildClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function signIn(label, email, password) {
  const supabase = buildClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw new Error(`${label} sign-in failed: ${error.message}`);
  }

  const { data: authData, error: userError } = await supabase.auth.getUser();
  if (userError || !authData.user?.id) {
    throw new Error(`${label} auth user lookup failed: ${userError?.message ?? "missing user id"}`);
  }

  return { supabase, userId: authData.user.id };
}

async function expectAllowed(name, fn, validator) {
  try {
    const { data, error } = await fn();
    if (error) throw error;
    if (validator) validator(data);
    record(name, "PASS");
    return data;
  } catch (error) {
    record(name, "FAIL", safeMessage(error));
    failures.push({ step: name, error: safeMessage(error) });
    return undefined;
  }
}

async function expectBlocked(name, fn) {
  try {
    const { data, error } = await fn();
    if (error) {
      record(name, "PASS");
      return;
    }

    if (Array.isArray(data) && data.length === 0) {
      record(name, "PASS");
      return;
    }

    if (data === null || typeof data === "undefined") {
      record(name, "PASS");
      return;
    }

    failures.push({ step: name, error: "operation unexpectedly returned data" });
    record(name, "FAIL", "operation unexpectedly returned data");
  } catch (error) {
    record(name, "PASS", safeMessage(error));
  }
}

function requireRow(data, label) {
  if (!data || !data.id) {
    throw new Error(`${label}: expected returned row with id`);
  }
}

function requireRows(data, label) {
  if (!Array.isArray(data) || data.length < 1) {
    throw new Error(`${label}: expected at least one visible row`);
  }
}

async function maybeAdminClient() {
  const adminEmail = envAny("TEST_ADMIN_EMAIL", "EXPRESSJOBS_STAGING_ADMIN_EMAIL");
  const adminPassword = envAny("TEST_ADMIN_PASSWORD", "EXPRESSJOBS_STAGING_ADMIN_PASSWORD");
  if (!adminEmail || !adminPassword) return null;
  return signIn("admin", adminEmail, adminPassword);
}

async function cleanup(admin, prefix) {
  if (!admin) return;
  try {
    if (createdMessageIds.size > 0) {
      await admin.supabase.from("ej_job_messages").delete().in("id", [...createdMessageIds]);
    }
    await admin.supabase.from("ej_job_messages").delete().ilike("body", `${prefix}%`);
  } catch {
    // Cleanup is best effort. The smoke result is determined before cleanup.
  }
}

const missing = requiredFixtures();
if (missing.length) {
  const output = {
    status: "BLOCKED_MISSING_TEST_FIXTURE",
    production_status: "NO-GO_PRODUCTION",
    missing,
    rls_smoke: { messages: {} },
  };
  console.log(JSON.stringify(output, null, 2));
  process.exit(1);
}

if (!["staging", "preview"].includes(process.env.APP_ENV)) {
  const output = {
    status: "BLOCKED_MISSING_TEST_FIXTURE",
    production_status: "NO-GO_PRODUCTION",
    missing: ["APP_ENV must be staging or preview"],
    rls_smoke: { messages: {} },
  };
  console.log(JSON.stringify(output, null, 2));
  process.exit(1);
}

const prefix = `RLS_SMOKE_MESSAGES_${Date.now()}_${randomUUID()}`;
const anonymous = buildClient();
let admin = null;

try {
  const client = await signIn("client", envAny("TEST_CLIENT_EMAIL", "EXPRESSJOBS_STAGING_CLIENT_EMAIL"), envAny("TEST_CLIENT_PASSWORD", "EXPRESSJOBS_STAGING_CLIENT_PASSWORD"));
  const worker = await signIn("accepted_worker", envAny("TEST_ACCEPTED_WORKER_EMAIL", "EXPRESSJOBS_STAGING_WORKER_EMAIL"), envAny("TEST_ACCEPTED_WORKER_PASSWORD", "EXPRESSJOBS_STAGING_WORKER_PASSWORD"));
  admin = await maybeAdminClient();

  const acceptedJob = await expectAllowed(
    "fixture_accepted_job_created",
    () =>
      client.supabase
        .from("ej_jobs")
        .insert({
          client_id: client.userId,
          title: `${prefix} accepted job`,
          description: "Non-production realtime chat RLS smoke accepted job.",
          location_text: "Montevideo staging",
          budget_uyu: 1000,
          status: "open",
        })
        .select("id")
        .single(),
    (data) => requireRow(data, "accepted job"),
  );

  const application = await expectAllowed(
    "fixture_worker_application_created",
    () =>
      worker.supabase
        .from("ej_job_applications")
        .insert({
          job_id: acceptedJob.id,
          worker_id: worker.userId,
          message: `${prefix} application`,
          proposed_amount_uyu: 950,
        })
        .select("id")
        .single(),
    (data) => requireRow(data, "application"),
  );

  await expectAllowed("fixture_client_accepts_application", () =>
    client.supabase.from("ej_job_applications").update({ status: "accepted" }).eq("id", application.id).select("id").single(),
  );

  await expectAllowed("fixture_client_assigns_accepted_worker", () =>
    client.supabase
      .from("ej_jobs")
      .update({ status: "accepted", accepted_worker_id: worker.userId })
      .eq("id", acceptedJob.id)
      .select("id")
      .single(),
  );

  const clientMessage = await expectAllowed(
    "job_client_insert",
    () =>
      client.supabase
        .from("ej_job_messages")
        .insert({ job_id: acceptedJob.id, sender_id: client.userId, body: `${prefix} client message` })
        .select("id, body")
        .single(),
    (data) => requireRow(data, "client message"),
  );
  if (clientMessage?.id) createdMessageIds.add(clientMessage.id);

  const workerMessage = await expectAllowed(
    "accepted_worker_insert",
    () =>
      worker.supabase
        .from("ej_job_messages")
        .insert({ job_id: acceptedJob.id, sender_id: worker.userId, body: `${prefix} worker message` })
        .select("id, body")
        .single(),
    (data) => requireRow(data, "worker message"),
  );
  if (workerMessage?.id) createdMessageIds.add(workerMessage.id);

  await expectAllowed(
    "job_client_select",
    () => client.supabase.from("ej_job_messages").select("id").eq("job_id", acceptedJob.id),
    (data) => requireRows(data, "client selected messages"),
  );

  await expectAllowed(
    "accepted_worker_select",
    () => worker.supabase.from("ej_job_messages").select("id").eq("job_id", acceptedJob.id),
    (data) => requireRows(data, "worker selected messages"),
  );

  const clientOnlyJob = await expectAllowed(
    "fixture_client_only_job_created",
    () =>
      client.supabase
        .from("ej_jobs")
        .insert({
          client_id: client.userId,
          title: `${prefix} client-only job`,
          description: "Non-production realtime chat RLS smoke client-only job.",
          location_text: "Montevideo staging",
          budget_uyu: 800,
          status: "open",
        })
        .select("id")
        .single(),
    (data) => requireRow(data, "client-only job"),
  );

  const clientOnlyMessage = await expectAllowed(
    "fixture_client_only_message_created",
    () =>
      client.supabase
        .from("ej_job_messages")
        .insert({ job_id: clientOnlyJob.id, sender_id: client.userId, body: `${prefix} client-only message` })
        .select("id")
        .single(),
    (data) => requireRow(data, "client-only message"),
  );
  if (clientOnlyMessage?.id) createdMessageIds.add(clientOnlyMessage.id);

  await expectBlocked("random_user_select_blocked", () =>
    worker.supabase.from("ej_job_messages").select("id").eq("job_id", clientOnlyJob.id),
  );

  await expectBlocked("random_user_insert_blocked", () =>
    worker.supabase
      .from("ej_job_messages")
      .insert({ job_id: clientOnlyJob.id, sender_id: worker.userId, body: `${prefix} random blocked insert` })
      .select("id"),
  );

  await expectBlocked("non_accepted_worker_select_blocked", () =>
    worker.supabase.from("ej_job_messages").select("id").eq("id", clientOnlyMessage.id),
  );

  await expectBlocked("non_accepted_worker_insert_blocked", () =>
    worker.supabase
      .from("ej_job_messages")
      .insert({ job_id: clientOnlyJob.id, sender_id: worker.userId, body: `${prefix} non-accepted worker blocked insert` })
      .select("id"),
  );

  await expectBlocked("anonymous_select_blocked", () =>
    anonymous.from("ej_job_messages").select("id").eq("job_id", acceptedJob.id),
  );

  await expectBlocked("anonymous_insert_blocked", () =>
    anonymous
      .from("ej_job_messages")
      .insert({ job_id: acceptedJob.id, sender_id: client.userId, body: `${prefix} anonymous blocked insert` })
      .select("id"),
  );

  await expectBlocked("sender_spoofing_blocked", () =>
    worker.supabase
      .from("ej_job_messages")
      .insert({ job_id: acceptedJob.id, sender_id: client.userId, body: `${prefix} spoofed sender insert` })
      .select("id"),
  );

  await expectBlocked("normal_user_update_blocked", () =>
    client.supabase.from("ej_job_messages").update({ body: `${prefix} forbidden update` }).eq("id", workerMessage.id).select("id"),
  );

  await expectBlocked("normal_user_delete_blocked", () =>
    client.supabase.from("ej_job_messages").delete().eq("id", workerMessage.id).select("id"),
  );

  if (admin) {
    const adminTargetBody = `${prefix} admin updated message`;
    const { error: adminUpdateError } = await admin.supabase
      .from("ej_job_messages")
      .update({ body: adminTargetBody })
      .eq("id", clientMessage.id);

    if (adminUpdateError) {
      failures.push({ step: "admin_update_delete", error: safeMessage(adminUpdateError) });
      record("admin_update_delete", "FAIL", safeMessage(adminUpdateError));
    } else {
      const { data: updatedRows, error: verifyUpdateError } = await client.supabase
        .from("ej_job_messages")
        .select("id, body")
        .eq("id", clientMessage.id);

      if (verifyUpdateError || !Array.isArray(updatedRows) || updatedRows[0]?.body !== adminTargetBody) {
        const message = verifyUpdateError ? safeMessage(verifyUpdateError) : "admin update did not change visible message body";
        failures.push({ step: "admin_update_delete", error: message });
        record("admin_update_delete", "FAIL", message);
      } else {
        const { error: adminDeleteError } = await admin.supabase.from("ej_job_messages").delete().eq("id", clientMessage.id);
        if (adminDeleteError) {
          failures.push({ step: "admin_update_delete", error: safeMessage(adminDeleteError) });
          record("admin_update_delete", "FAIL", safeMessage(adminDeleteError));
        } else {
          const { data: deletedRows, error: verifyDeleteError } = await client.supabase
            .from("ej_job_messages")
            .select("id")
            .eq("id", clientMessage.id);

          if (verifyDeleteError || (Array.isArray(deletedRows) && deletedRows.length === 0)) {
            createdMessageIds.delete(clientMessage.id);
            record("admin_update_delete", "PASS");
          } else {
            failures.push({ step: "admin_update_delete", error: "admin delete did not remove visible message" });
            record("admin_update_delete", "FAIL", "admin delete did not remove visible message");
          }
        }
      }
    }
  } else {
    record("admin_update_delete", "SKIPPED_ADMIN_FIXTURE_NOT_CONFIGURED");
  }
} catch (error) {
  failures.push({ step: "fatal", error: safeMessage(error) });
} finally {
  await cleanup(admin, prefix);
}

const status = failures.length > 0 ? "FAIL_RLS" : "PASS";
const output = {
  status,
  production_status: "NO-GO_PRODUCTION",
  rls_smoke: {
    messages: results,
  },
};

if (failures.length > 0) {
  output.failures = failures;
}

console.log(JSON.stringify(output, null, 2));
process.exit(status === "PASS" ? 0 : 1);
