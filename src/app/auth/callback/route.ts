import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  buildAuthErrorRedirect,
  buildPostOAuthRedirect,
  defaultOAuthProfileRole,
} from "@/lib/social-auth";

export async function GET(request: NextRequest) {
  const requestUrl = request.url;
  const code = request.nextUrl.searchParams.get("code");
  const oauthError = request.nextUrl.searchParams.get("error_description") ?? request.nextUrl.searchParams.get("error");

  if (oauthError) {
    return NextResponse.redirect(buildAuthErrorRedirect(requestUrl, "provider_error"));
  }

  if (!code) {
    return NextResponse.redirect(buildAuthErrorRedirect(requestUrl, "missing_code"));
  }

  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(buildAuthErrorRedirect(requestUrl, "not_configured"));
  }

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

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.redirect(buildAuthErrorRedirect(requestUrl, "exchange_failed"));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const fullName =
      typeof user.user_metadata.name === "string" && user.user_metadata.name.trim()
        ? user.user_metadata.name.trim()
        : "Trabajos Rapidos user";

    const { error: profileError } = await supabase.from("ej_profiles").upsert(
      {
        id: user.id,
        role: defaultOAuthProfileRole,
        full_name: fullName,
      },
      { onConflict: "id", ignoreDuplicates: true },
    );

    if (profileError) {
      return NextResponse.redirect(buildAuthErrorRedirect(requestUrl, "profile_setup_failed"));
    }
  }

  return NextResponse.redirect(buildPostOAuthRedirect(requestUrl));
}
