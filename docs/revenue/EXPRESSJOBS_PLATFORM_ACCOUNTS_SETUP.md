# ExpressJobs Platform Accounts Setup

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

This document lists human setup tasks. Do not store credentials, bank details, access tokens, private aliases, recovery codes, or personal payment data in GitHub.

## WhatsApp Business

1. Create or use a WhatsApp Business account.
2. Prepare public business profile.
3. Create catalog items for:
   - Landing basica.
   - Landing + textos + WhatsApp.
   - Banner fundador.
   - Publicacion manual.
4. Generate public WhatsApp sales link outside the repo.
5. Configure `NEXT_PUBLIC_WHATSAPP_SALES_LINK` only in secure Preview/staging env if the human approves public usage.

## Mercado Pago / Manual Collection

1. Human configures Mercado Pago outside the repo.
2. Human shares payment link/alias manually only with customers.
3. Do not commit payment links, aliases, bank data, or account identifiers.
4. Record only `paid yes/no`, amount, package, and delivery state in the tracker.

## Prex / BROU / Cash

Use only as manual private collection methods. Never store account numbers, card details, personal ID, or banking screenshots in the repository.

## Instagram / Facebook

1. Use public business pages only.
2. Post landing/banner offers manually.
3. Direct all inquiries to WhatsApp Business.
4. Do not automate messages from Codex.
5. Do not promise production platform readiness.

## Google Business Profile

1. Create or update business profile manually.
2. Add safe public service descriptions.
3. Link to public website/landing only when approved.
4. Do not use unverified production claims.

## Feature Flags

- `ENABLE_MANUAL_PAID_LISTINGS=true` for preview/staging.
- `ENABLE_SPONSORED_BANNERS=false` by default.
- `ENABLE_AD_SLOTS=false` by default.
- `ENABLE_AFFILIATE_LINKS=false` by default.
- `NEXT_PUBLIC_WHATSAPP_SALES_LINK` optional.
- `NEXT_PUBLIC_SPONSOR_INTAKE_LINK` optional.
