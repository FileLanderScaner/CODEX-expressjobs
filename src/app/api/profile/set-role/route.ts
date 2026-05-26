import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function normalizeFullName(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim().replace(/\s+/g, " ");
  if (!trimmed) {
    return null;
  }

  return trimmed.slice(0, 120);
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
      return NextResponse.json(
        { ok: false, error: "server_not_configured" },
        { status: 503 },
      );
    }

    const body = (await request.json().catch(() => null)) as {
      role?: unknown;
      fullName?: unknown;
    } | null;

    const role = body?.role;
    if (role !== "client" && role !== "worker") {
      return NextResponse.json(
        { ok: false, error: "invalid_role" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          for (const cookieToSet of cookiesToSet) {
            cookieStore.set(cookieToSet.name, cookieToSet.value, cookieToSet.options);
          }
        },
      },
    });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { ok: false, error: "unauthorized" },
        { status: 401 },
      );
    }

    const fullName =
      normalizeFullName(body?.fullName) ??
      normalizeFullName(user.user_metadata.name) ??
      user.email ??
      "Usuario Trabajos Rapidos";

    const adminSupabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { error } = await adminSupabase.rpc("ej_set_profile_role_for_user", {
      target_user_id: user.id,
      requested_role: role,
      requested_full_name: fullName,
    });

    if (error) {
      console.error("set-role failed", {
        code: error.code,
        userRef: "authenticated_user",
      });

      return NextResponse.json(
        { ok: false, error: "role_update_failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, role });
  } catch {
    return NextResponse.json(
      { ok: false, error: "unexpected_error" },
      { status: 500 },
    );
  }
}
