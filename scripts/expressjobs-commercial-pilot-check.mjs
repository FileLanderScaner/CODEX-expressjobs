import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "docs/sales/EXPRESSJOBS_MANUAL_PILOT_SALES_SYSTEM.md",
  "docs/sales/EXPRESSJOBS_PILOT_CRM_WORKFLOW.md",
  "docs/sales/EXPRESSJOBS_PILOT_OFFERS.md",
  "docs/sales/EXPRESSJOBS_PR55_MANUAL_SALES_CHECKLIST.md",
  "docs/sales/EXPRESSJOBS_SANITIZED_LEAD_REGISTER_TEMPLATE.md",
  "docs/testing/EXPRESSJOBS_CONTROLLED_STAGING_USER_PILOT_MATRIX.md",
  "docs/testing/EXPRESSJOBS_CONTROLLED_USER_FEEDBACK_FORM.md",
];

const missingFiles = requiredFiles.filter((file) => !existsSync(file));

if (missingFiles.length) {
  console.error(`COMMERCIAL_PILOT_CHECK=FAIL_MISSING_FILES ${missingFiles.join(",")}`);
  process.exit(1);
}

const monetizationConfig = readFileSync("src/lib/monetization/monetization-config.ts", "utf8");

const requiredConfigSnippets = [
  "inAppPaymentsEnabled: false",
  "paypalLiveEnabled: false",
  'whatsappNumber: "59897045305"',
  'email: "trabajosrapidos.uy@gmail.com"',
];

const missingConfig = requiredConfigSnippets.filter((snippet) => !monetizationConfig.includes(snippet));

if (missingConfig.length) {
  console.error(`COMMERCIAL_PILOT_CHECK=FAIL_UNSAFE_CONFIG ${missingConfig.join(",")}`);
  process.exit(1);
}

const commercialSurfaces = [
  "src/app/pricing/page.tsx",
  "src/app/ofertas/page.tsx",
  "src/components/pricing-tracking.tsx",
  "src/components/monetization/offer-contact-form.tsx",
  "src/components/monetization/whatsapp-cta.tsx",
];

const forbiddenRuntimePatterns = [
  "/api/payments/paypal/create-subscription",
  "createPayPalSandboxSubscription",
  "paypal.com/checkoutnow",
  "checkout.stripe.com",
];

const findings = [];

for (const file of commercialSurfaces) {
  const source = readFileSync(file, "utf8");
  for (const pattern of forbiddenRuntimePatterns) {
    if (source.includes(pattern)) {
      findings.push(`${file}:${pattern}`);
    }
  }
}

if (findings.length) {
  console.error(`COMMERCIAL_PILOT_CHECK=FAIL_LIVE_PAYMENT_SURFACE ${findings.join(",")}`);
  process.exit(1);
}

console.log("COMMERCIAL_PILOT_CHECK=PASS_MANUAL_ONLY_NO_LIVE_PAYMENT_SURFACE");
