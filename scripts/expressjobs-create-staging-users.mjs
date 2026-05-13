import { createClient } from "@supabase/supabase-js";

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
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
  console.error(`BLOCKED_SUPABASE_ACCESS: missing staging user setup env vars: ${missing.join(", ")}`);
  process.exit(2);
}

if (!["staging", "preview"].includes(process.env.APP_ENV)) {
  console.error("BLOCKED_SUPABASE_ACCESS: APP_ENV must be staging or preview.");
  process.exit(2);
}

if (process.env.EXPRESSJOBS_ALLOW_STAGING_MUTATIONS !== "true") {
  console.error("BLOCKED_SUPABASE_ACCESS: set EXPRESSJOBS_ALLOW_STAGING_MUTATIONS=true only for non-production staging setup.");
  process.exit(2);
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const users = [
  {
    role: "client",
    email: process.env.EXPRESSJOBS_STAGING_CLIENT_EMAIL,
    password: process.env.EXPRESSJOBS_STAGING_CLIENT_PASSWORD,
    fullName: "ExpressJobs Staging Client",
  },
  {
    role: "worker",
    email: process.env.EXPRESSJOBS_STAGING_WORKER_EMAIL,
    password: process.env.EXPRESSJOBS_STAGING_WORKER_PASSWORD,
    fullName: "ExpressJobs Staging Worker",
  },
  {
    role: "admin",
    email: process.env.EXPRESSJOBS_STAGING_ADMIN_EMAIL,
    password: process.env.EXPRESSJOBS_STAGING_ADMIN_PASSWORD,
    fullName: "ExpressJobs Staging Admin",
  },
];

for (const user of users) {
  const { data, error } = await supabase.auth.admin.createUser({
    email: user.email,
    password: user.password,
    email_confirm: true,
    app_metadata: { expressjobs_role: user.role },
  });

  if (error && !error.message.toLowerCase().includes("already")) {
    console.error(`BLOCKED_SUPABASE_ACCESS: could not create ${user.role} staging user.`);
    console.error(error.message);
    process.exit(2);
  }

  const userId = data.user?.id;
  if (userId) {
    const { error: profileError } = await supabase.from("ej_profiles").upsert({
      id: userId,
      role: user.role,
      full_name: user.fullName,
      city: "Montevideo",
    });

    if (profileError) {
      console.error(`BLOCKED_SUPABASE_ACCESS: could not upsert ${user.role} profile.`);
      console.error(profileError.message);
      process.exit(2);
    }
  }
}

console.log("ExpressJobs staging users prepared without printing credentials.");
