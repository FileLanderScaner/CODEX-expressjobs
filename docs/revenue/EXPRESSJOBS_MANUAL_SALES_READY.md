# ExpressJobs Manual Sales Ready

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

Updated: 2026-05-28

## State

`PAYMENTS_LIVE_OFF_MANUAL_SALES_READY`

Manual monetization is the active safe path. `/pricing`, `/ofertas`, `/sponsor`, and existing revenue docs point users to WhatsApp/contact-driven sales. In-app payments and PayPal live remain off.

## Safe Offer Path

1. Human reviews the lead from WhatsApp/email.
2. Human confirms scope, price, delivery, and payment method outside the app.
3. Human records the lead and delivery status in the manual tracker.
4. No app premium entitlement is granted unless a verified future payment webhook path is explicitly approved.

## Current Payment Gate

- `ENABLE_PAYMENTS=false`
- PayPal sandbox smoke returned `PAYPAL_SANDBOX_SMOKE_READY_NOT_RUN` by design.
- PayPal live is OFF.
- Real payments are OFF.

## Production Rule

Manual revenue can continue for controlled pilots. Public production remains `NO-GO_PRODUCTION` until human release approval.
