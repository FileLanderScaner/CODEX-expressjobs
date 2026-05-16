# ExpressJobs Online Revenue Operator

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Objective

Generate revenue online now through manual sales, without depending on public production, PayPal live, or in-app payments.

## Revenue Priority

1. Landing pages for businesses.
2. Founder sponsored banners.
3. Manual job posting.
4. Esthetics/Sofia booking pack.
5. Ads and affiliates prepared by flags only.

## Channels

- WhatsApp Business.
- Facebook Marketplace.
- Facebook groups.
- Instagram stories.
- LinkedIn.
- Workana.
- Fiverr.

## Human Requirements

- Public WhatsApp Business link outside the repo.
- Manual payment method outside the repo.
- Permission to send messages from human-owned accounts.
- Human review before posting in groups or marketplaces.

## Codex Can Do

- Prepare scripts.
- Prepare listings.
- Generate follow-ups.
- Update non-sensitive trackers.
- Prepare delivery copy and landing drafts.

## Codex Must Not Do

- Contact real users automatically.
- Store bank data.
- Store private phone numbers.
- Process payments inside the app.
- Promise public production.
- Touch Supabase remote or production deploys.

## Feature Flags

- `ENABLE_MANUAL_PAID_LISTINGS=true` for staging/preview.
- `ENABLE_SPONSORED_BANNERS=false` by default.
- `ENABLE_AD_SLOTS=false` by default.
- `ENABLE_AFFILIATE_LINKS=false` by default.
- `NEXT_PUBLIC_WHATSAPP_SALES_LINK` optional.
- `NEXT_PUBLIC_SPONSOR_INTAKE_LINK` optional.
