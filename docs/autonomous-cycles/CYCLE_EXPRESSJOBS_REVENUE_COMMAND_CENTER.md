# Cycle ExpressJobs Revenue Command Center

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_REVENUE_COMMAND_CENTER_OPERATING_PACK`

## Objective

Create a manual revenue command center so ExpressJobs can sell offers today without waiting for public production, PayPal live, or in-app payments.

## Files Created

- `docs/revenue/EXPRESSJOBS_REVENUE_COMMAND_CENTER.md`
- `docs/revenue/EXPRESSJOBS_TODAY_CASH_PLAN.md`
- `docs/revenue/EXPRESSJOBS_MANUAL_JOB_POSTING_OFFER.md`
- `docs/revenue/EXPRESSJOBS_SPONSORED_BANNER_OFFER.md`
- `docs/revenue/EXPRESSJOBS_LOCAL_BUSINESS_LANDING_OFFER.md`
- `docs/revenue/EXPRESSJOBS_ESTHETICS_SOFIA_OFFER.md`
- `docs/revenue/EXPRESSJOBS_WHATSAPP_SALES_SCRIPTS.md`
- `docs/revenue/EXPRESSJOBS_OBJECTION_HANDLING.md`
- `docs/revenue/EXPRESSJOBS_PAYMENT_AND_DELIVERY_TRACKER.md`
- `docs/revenue/EXPRESSJOBS_DAILY_REVENUE_DASHBOARD.md`
- `src/app/sponsor/page.tsx`
- `src/components/monetization/manual-paid-listing-cta.tsx`
- `src/components/monetization/sponsored-banner.tsx`
- `src/lib/monetization/monetization-config.ts`

## Offers

| Offer | Status | Price |
| --- | --- | ---: |
| Landing basic Uruguay | `READY_TO_SELL_MANUALLY` | $1500 UYU |
| Landing copy + WhatsApp Uruguay | `READY_TO_SELL_MANUALLY` | $2500 UYU |
| Landing + banner Uruguay | `READY_TO_SELL_MANUALLY` | $3500 UYU |
| Manual job posting basic | `READY_TO_SELL_MANUALLY` | $500 UYU |
| Manual job posting intermediate | `READY_TO_SELL_MANUALLY` | $1000 UYU |
| Manual job posting urgent | `READY_TO_SELL_MANUALLY` | $1500 UYU |
| Founder banner 7 days | `READY_TO_SELL_MANUALLY` | $500 UYU |
| Founder banner 30 days | `READY_TO_SELL_MANUALLY` | $1500 UYU |
| Banner + landing simple | `READY_TO_SELL_MANUALLY` | $3000 UYU |
| Landing basic LatAm | `READY_TO_SELL_MANUALLY` | USD 39 |
| Landing copy + WhatsApp LatAm | `READY_TO_SELL_MANUALLY` | USD 69 |
| Landing + banner LatAm | `READY_TO_SELL_MANUALLY` | USD 99 |
| Esthetics/Sofia booking pack | `READY_TO_SELL_MANUALLY` | custom/manual |

## Feature Flags

- `ENABLE_MANUAL_PAID_LISTINGS=true` for preview/staging.
- `ENABLE_SPONSORED_BANNERS=false` by default.
- `ENABLE_AD_SLOTS=false` by default.
- `ENABLE_AFFILIATE_LINKS=false` by default.
- `NEXT_PUBLIC_WHATSAPP_SALES_LINK` optional.
- `NEXT_PUBLIC_SPONSOR_INTAKE_LINK` optional.

## Safety

- Production not touched.
- PayPal live not enabled.
- No in-app payments.
- No real users contacted by Codex.
- No payment aliases or bank details committed.
- Supabase remote not touched.
- Sponsor page uses manual CTA and does not process payments.

## Decision

- `REVENUE_COMMAND_CENTER=READY_MANUAL_SALES_ONLY`
- `SPONSOR_PAGE=READY_PREVIEW_MANUAL_CTA`
- `MANUAL_REVENUE_OFFERS=READY`
- `IN_APP_PAYMENTS=OFF`
- `PAYPAL_LIVE=OFF`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`
- `ISSUE_15=OPEN_UNTIL_FIRST_REAL_MANUAL_SALE`

## Next Mode

`EXPRESSJOBS_REVENUE_DAILY_SALES_EXECUTION_TRACKER`
