# ExpressJobs Controlled Staging User Pilot Matrix

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Goal

Run a small, human-controlled pilot that validates whether real people understand Trabajos Rapidos / ExpressJobs, can complete the intended marketplace flow, and can express buying interest without public production launch or live payments.

## Pilot Roles

| Role | Count | Entry route | Success evidence | Do not collect |
| --- | ---: | --- | --- | --- |
| New client | 2-3 | `/`, `/client/jobs/new`, `/dashboard/client` | Publishes or describes one real local task in staging/sanitized form | Private phone, home address, payment details |
| Worker | 2-3 | `/worker/jobs`, `/dashboard/worker`, `/dashboard/worker/applications` | Understands profile completion and can apply to an open task | ID documents, private references, bank data |
| Local business | 1-2 | `/pricing`, `/ofertas` | Understands manual pilot offer and asks for a quote/contact | Payment receipt, card/bank data |
| Reviewer/admin | 1 | `/admin`, docs/status | Confirms admin protection, no demo data presented as real, and `NO-GO_PRODUCTION` is visible | Credentials, tokens, production access |

## Required Route Smoke Before Inviting Testers

- `/`
- `/jobs`
- `/worker/jobs`
- `/client/jobs/new`
- `/pricing`
- `/ofertas`
- `/dashboard/client`
- `/dashboard/worker`
- `/dashboard/worker/applications`
- `/admin`

Minimum evidence:

- Desktop and mobile route load.
- No horizontal overflow.
- No app error boundary.
- No browser console errors.
- `NO-GO_PRODUCTION` visible where expected.
- Pricing/ofertas do not show live checkout.
- WhatsApp/email CTA opens contact path only.

## Human Pilot Script

1. Explain: "Esto es un piloto controlado. Produccion publica y pagos dentro de la app siguen desactivados."
2. Ask the user to start from the route for their role.
3. Observe what they click first.
4. Ask them to complete or describe the target task.
5. Record only sanitized feedback using `docs/testing/EXPRESSJOBS_CONTROLLED_USER_FEEDBACK_FORM.md`.
6. If the user asks about buying a pilot offer, record only a sanitized lead in `docs/sales/EXPRESSJOBS_SANITIZED_LEAD_REGISTER_TEMPLATE.md`.
7. Do not contact more users automatically. Human operator controls outreach.

## GO Criteria

- At least one client understands how to publish a task.
- At least one worker understands how to find and apply.
- At least one business understands the manual offer and that payments are not in-app.
- No participant reports confusion that the app is already public production.
- No live payment path appears.

## NO-GO Criteria

- Any page implies guaranteed work, guaranteed applicants, escrow, verified identity, or live payment protection without implementation.
- A tester reaches a broken CTA on the core route set.
- A human cannot explain how to register feedback without PII.
- Preview is inaccessible and no local equivalent smoke is available.

## Status

`CONTROLLED_STAGING_USER_PILOT_MATRIX=READY_FOR_HUMAN_OPERATOR`
