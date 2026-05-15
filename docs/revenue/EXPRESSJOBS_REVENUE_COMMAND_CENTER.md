# ExpressJobs Revenue Command Center

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Purpose

Generate manual revenue immediately while the app remains in staging and production is blocked. This command center sells services around ExpressJobs without processing payments inside the app.

## Operating Rules

- No app payments.
- No PayPal live.
- No production deploy.
- No sensitive payment data in GitHub.
- No real user contact from Codex.
- Human sends every message manually.
- Human provides payment alias/link outside the repo.
- Feature flags keep technical monetization disabled until gates pass.

## Team Roles

| Role | Responsibility |
| --- | --- |
| Revenue Lead | Selects targets, sends manual messages, closes payment outside the app. |
| Delivery Operator | Creates manual posts, banners, or landing pages after payment confirmation. |
| QA/Safety | Confirms no production claims, no payment links in repo, and no sensitive data captured. |
| Codex Operator | Prepares scripts, templates, trackers, docs, and safe implementation only after approval. |

## Daily Routine

1. Pick 20 leads.
2. Send 10 landing page messages first.
3. Send 5 founder banner messages.
4. Send 5 manual job posting messages.
5. Track every response in the daily tracker.
6. Ask for manual payment confirmation outside the app.
7. Deliver only the promised manual asset.
8. End the day with revenue, blockers, and tomorrow's follow-up list.

## What To Sell Today

1. Landing page for a local business.
2. Founder sponsored banner for local businesses.
3. Manual job posting on ExpressJobs.
4. Esthetics/Sofia booking and WhatsApp follow-up pack.

## Sales Priority

1. Landing pages for businesses.
2. Founder sponsored banners.
3. Manual job posting.
4. Esthetics/Sofia commercial pack.
5. Future affiliates/ads only behind feature flags.

## What Not To Sell Yet

- Public production access.
- Automated app payments.
- PayPal live subscriptions.
- Affiliate/ad revenue as the main immediate offer.
- Guaranteed worker availability.
- Guaranteed revenue or bookings.
- AI agents in production.

## Commercial Channel

Use the human's WhatsApp Business sales channel. In code/docs, use the placeholder `NEXT_PUBLIC_WHATSAPP_SALES_LINK`; do not hardcode a personal phone number.

## Definition Of Success

- At least 10 qualified conversations per day.
- At least 3 price-qualified leads per day.
- At least 1 paid manual sale or deposit as early as possible.
- No production/security rule violations.
