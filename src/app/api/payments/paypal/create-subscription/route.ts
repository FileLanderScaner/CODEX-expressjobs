import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createPayPalSandboxSubscription } from "@/lib/payments/paypal-client";
import { getPayPalConfig, getSafePayPalPublicStatus, PayPalConfigError } from "@/lib/payments/paypal-config";
import { canGrantPremiumFromCreateSubscription } from "@/lib/payments/subscription-state";

export async function POST() {
  try {
    const config = getPayPalConfig();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: "AUTH_NOT_CONFIGURED" }, { status: 503 });
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
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "AUTH_REQUIRED" }, { status: 401 });
    }

    const subscription = await createPayPalSandboxSubscription(config);

    return NextResponse.json({
      subscriptionId: subscription.id,
      status: subscription.status,
      approvalUrl: subscription.approvalUrl,
      premiumGranted: canGrantPremiumFromCreateSubscription(),
      premiumSource: "verified_webhook_required",
    });
  } catch (error) {
    if (error instanceof PayPalConfigError) {
      return NextResponse.json({ error: error.status, paypal: getSafePayPalPublicStatus() }, { status: 403 });
    }

    return NextResponse.json({ error: "PAYPAL_SUBSCRIPTION_CREATE_BLOCKED" }, { status: 502 });
  }
}
