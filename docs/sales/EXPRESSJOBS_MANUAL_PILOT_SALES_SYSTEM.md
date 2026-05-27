# ExpressJobs Manual Pilot Sales System

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Purpose

Validate demand manually before automated payments or public production launch. The product stays staged/preview-only; all sales, contact, payment links, delivery promises, and follow-up are handled by a human outside Codex.

## Safety Rules

- No automatic contact to real users.
- No live PayPal, MercadoPago, card, or in-app payments.
- No payment links, bank details, receipts, private phones, emails, IDs, or secrets in git.
- No promise of protected payments, 24/7 support, verified workers, guaranteed hires, or guaranteed income unless implemented and verified.
- Production remains `NO-GO_PRODUCTION`.

## Manual Flow

1. Human collects an inbound lead or manually selects a safe prospect.
2. Human records only a sanitized lead alias in the tracker/CRM.
3. Human sends WhatsApp/email copy manually.
4. Human shares the payment link manually outside the repo.
5. Human confirms payment outside the app.
6. ExpressJobs operator creates the manual listing/highlight/profile deliverable.
7. Human collects feedback and records only sanitized notes.
8. Codex uses sanitized feedback to improve UX, copy, onboarding, and marketplace flow.

## CRM Fields

| Field | Allowed value |
| --- | --- |
| Lead alias | Sanitized internal alias only |
| Segment | Client, worker, local business, urgent task |
| Offer | Beta, destacado, urgente, PRO, commission |
| Stage | New, contacted, interested, quoted, paid manually, delivered, feedback |
| Next action | Human-owned next step |
| Risk | Promise/payment/privacy risk |

## Current Gate

`MANUAL_PILOT_SYSTEM=READY_FOR_HUMAN_OPERATOR`

Codex may prepare docs, copy, UI disclaimers, and trackers. Codex must not contact users, create live payments, or claim public production readiness.
