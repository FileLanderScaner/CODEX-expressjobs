# ExpressJobs First 10 Manual Approval Gate

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Gate Status

- `RELEASE_GATE_STATUS=PASS_FOR_FIRST_10_CONTROLLED_INTERNAL`
- `FIRST_10_TESTERS=GO_CONTROLLED_INTERNAL_ONLY`
- `REAL_TESTER_CONTACT=READY_FOR_MANUAL_APPROVAL`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Final Checklist Before Contacting Testers

- [ ] Human approver confirms this is a controlled internal test only.
- [ ] Human approver confirms no public production launch is intended.
- [ ] Human approver confirms testers will use protected Preview only.
- [ ] Human approver confirms no Vercel Production changes are needed.
- [ ] Human approver confirms no live payments will be attempted.
- [ ] Human approver confirms no AI agents production features will be enabled.
- [ ] Human approver confirms testers must not enter sensitive personal data.
- [ ] Human approver confirms no bypass secret or private token will be shared.
- [ ] Human approver confirms no automated external outreach will be used.

## Technical Confirmations

- `GOOGLE_AUTH_SMOKE=PASS`
- `CALLBACK_REACHED=yes`
- `SESSION_CREATED=yes`
- `PROFILE_CREATED_OR_PRESENT=yes`
- `RLS_REAL_SMOKE_STATUS=PASS`
- `PREVIEW_BROWSER_SMOKE=PASS`
- `SECRET_SCAN=PASS`
- `PRODUCTION_CHECK=PASS_SAFE_NO_GO`
- `PAYMENTS_LIVE=OFF`
- `AI_AGENTS_PRODUCTION=OFF`

## Approval Record

Use this section only when a human explicitly approves manual contact.

- Approval decision: `[GO / NO-GO]`
- Approval date/time: `[YYYY-MM-DD HH:mm TZ]`
- Responsible human: `[NAME / ROLE]`
- Approved tester count: `[max 10]`
- Approved contact channel: `[manual WhatsApp / manual email / other]`
- Preview access method: `[protected Preview, no bypass secret shared]`

## GO Criteria

Manual First 10 invitations may be sent only if all are true:

- Approval decision is `GO`.
- Responsible human is recorded.
- Preview access instructions do not expose secrets.
- Testers are internal/trusted only.
- Testers are told the product is staging/preproduction.
- Testers are told not to enter sensitive personal data.
- Testers are told not to attempt real payments.
- Feedback collection path is ready.

## NO-GO Criteria

Do not contact testers if any are true:

- Any gate check regresses from PASS.
- Production deployment is required.
- Production environment change is required.
- A secret would need to be shared.
- Payments live would need to be enabled.
- AI agents production would need to be enabled.
- Real personal data is required.
- Contact would be automated or external.

## Decision

Current decision:

```text
READY_FOR_HUMAN_APPROVAL
```

No real testers have been contacted by Codex.
