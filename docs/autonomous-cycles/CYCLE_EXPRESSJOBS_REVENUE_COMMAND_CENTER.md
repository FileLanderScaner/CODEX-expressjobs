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

## Offers

| Offer | Status | Price |
| --- | --- | ---: |
| Manual job posting basic | `READY_TO_SELL_MANUALLY` | $500 UYU |
| Manual job posting intermediate | `READY_TO_SELL_MANUALLY` | $1000 UYU |
| Manual job posting urgent | `READY_TO_SELL_MANUALLY` | $1500 UYU |
| Founder banner 7 days | `READY_TO_SELL_MANUALLY` | $500 UYU |
| Founder banner 30 days | `READY_TO_SELL_MANUALLY` | $1500 UYU |
| Banner + landing simple | `READY_TO_SELL_MANUALLY` | $3000 UYU |
| Local business landing basic | `READY_TO_SELL_MANUALLY` | $1500 UYU |
| Landing with copy + WhatsApp + form | `READY_TO_SELL_MANUALLY` | $2500 UYU |
| Landing + banner + initial post | `READY_TO_SELL_MANUALLY` | $3500 UYU |
| Esthetics/Sofia booking pack | `READY_TO_SELL_MANUALLY` | custom/manual |

## Safety

- Production not touched.
- PayPal live not enabled.
- No in-app payments.
- No real users contacted by Codex.
- No payment aliases or bank details committed.
- Supabase remote not touched.

## Decision

- `REVENUE_COMMAND_CENTER=READY_MANUAL_SALES_ONLY`
- `MANUAL_REVENUE_OFFERS=READY`
- `IN_APP_PAYMENTS=OFF`
- `PAYPAL_LIVE=OFF`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`
- `ISSUE_15=OPEN_UNTIL_FIRST_REAL_MANUAL_SALE`

## Next Mode

`EXPRESSJOBS_REVENUE_DAILY_SALES_EXECUTION_TRACKER`
