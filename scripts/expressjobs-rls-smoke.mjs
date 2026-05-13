import { createClient } from "@supabase/supabase-js";

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "APP_ENV",
  "EXPRESSJOBS_STAGING_CLIENT_EMAIL",
  "EXPRESSJOBS_STAGING_CLIENT_PASSWORD",
  "EXPRESSJOBS_STAGING_WORKER_EMAIL",
  "EXPRESSJOBS_STAGING_WORKER_PASSWORD",
  "EXPRESSJOBS_STAGING_ADMIN_EMAIL",
  "EXPRESSJOBS_STAGING_ADMIN_PASSWORD",
];

const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(`BLOCKED_SUPABASE_ACCESS: missing RLS smoke env vars: ${missing.join(", ")}`);
  process.exit(2);
}

if (!["staging", "preview"].includes(process.env.APP_ENV)) {
  console.error("BLOCKED_SUPABASE_ACCESS: APP_ENV must be staging or preview.");
  process.exit(2);
}

function client() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function signIn(email, password) {
  const supabase = client();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw new Error(`sign in failed for staging user: ${error.message}`);
  }
  return supabase;
}

async function expectBlocked(label, action) {
  const { error, data } = await action();
  if (!error && Array.isArray(data) && data.length > 0) {
    throw new Error(`${label}: expected blocked or empty result`);
  }
  if (!error && !Array.isArray(data) && data) {
    throw new Error(`${label}: expected blocked operation`);
  }
}

async function expectAllowed(label, action) {
  const { error, data } = await action();
  if (error) {
    throw new Error(`${label}: expected allowed, got ${error.message}`);
  }
  return data;
}

const anonymous = client();
const clientUser = await signIn(process.env.EXPRESSJOBS_STAGING_CLIENT_EMAIL, process.env.EXPRESSJOBS_STAGING_CLIENT_PASSWORD);
const workerUser = await signIn(process.env.EXPRESSJOBS_STAGING_WORKER_EMAIL, process.env.EXPRESSJOBS_STAGING_WORKER_PASSWORD);
const adminUser = await signIn(process.env.EXPRESSJOBS_STAGING_ADMIN_EMAIL, process.env.EXPRESSJOBS_STAGING_ADMIN_PASSWORD);

const { data: clientAuth } = await clientUser.auth.getUser();
const { data: workerAuth } = await workerUser.auth.getUser();

const clientId = clientAuth.user?.id;
const workerId = workerAuth.user?.id;

if (!clientId || !workerId) {
  throw new Error("BLOCKED_SUPABASE_ACCESS: staging users did not return ids.");
}

const suffix = Date.now();

await expectBlocked("anonymous cannot create profile", () =>
  anonymous.from("ej_profiles").insert({ id: crypto.randomUUID(), role: "client", full_name: "Anonymous" }),
);

const job = await expectAllowed("client creates own job", () =>
  clientUser
    .from("ej_jobs")
    .insert({
      client_id: clientId,
      title: `RLS smoke job ${suffix}`,
      description: "Non-production RLS smoke test job.",
      location_text: "Montevideo staging",
      budget_uyu: 1000,
      status: "open",
    })
    .select("id")
    .single(),
);

const jobId = job.id;

await expectAllowed("worker sees open jobs", () => workerUser.from("ej_jobs").select("id").eq("id", jobId).single());

const application = await expectAllowed("worker creates own application", () =>
  workerUser
    .from("ej_job_applications")
    .insert({
      job_id: jobId,
      worker_id: workerId,
      message: "RLS smoke application.",
      proposed_amount_uyu: 950,
    })
    .select("id")
    .single(),
);

await expectBlocked("worker cannot accept own application", () =>
  workerUser.from("ej_job_applications").update({ status: "accepted" }).eq("id", application.id).select("id"),
);

await expectAllowed("client sees applications for own job", () =>
  clientUser.from("ej_job_applications").select("id").eq("job_id", jobId),
);

await expectAllowed("client accepts application for own job", () =>
  clientUser.from("ej_job_applications").update({ status: "accepted" }).eq("id", application.id).select("id").single(),
);

await expectAllowed("client assigns accepted worker", () =>
  clientUser.from("ej_jobs").update({ status: "accepted", accepted_worker_id: workerId }).eq("id", jobId).select("id").single(),
);

const message = await expectAllowed("participant sends message", () =>
  workerUser.from("ej_job_messages").insert({ job_id: jobId, sender_id: workerId, body: "RLS smoke message." }).select("id").single(),
);

await expectAllowed("participants read messages", () => clientUser.from("ej_job_messages").select("id").eq("id", message.id).single());

await expectAllowed("client completes job", () =>
  clientUser.from("ej_jobs").update({ status: "completed", completed_at: new Date().toISOString() }).eq("id", jobId).select("id").single(),
);

await expectAllowed("participant creates completed job review", () =>
  clientUser
    .from("ej_job_reviews")
    .insert({ job_id: jobId, reviewer_id: clientId, reviewee_id: workerId, rating: 5, comment: "RLS smoke review." })
    .select("id")
    .single(),
);

await expectAllowed("admin sees audit table", () => adminUser.from("ej_admin_audit_logs").select("id").limit(1));
await expectBlocked("normal user cannot see audit table", () => clientUser.from("ej_admin_audit_logs").select("id").limit(1));

console.log("EXPRESSJOBS_RLS_STAGING_PASS");
