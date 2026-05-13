# ExpressJobs First 10 Tester GO/NO-GO

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Current Status

`FIRST_10_EXTERNAL_TESTERS_STATUS=NO-GO_UNTIL_PREVIEW_AND_RLS_PASS`

## Pre-Run Gate

First 10 tester execution remains blocked until:

- Vercel Preview PASS.
- Supabase staging PASS.
- `staging:check` PASS.
- `rls:smoke` PASS.
- Browser smoke PASS.
- Release gate updated.

## GO Criteria To Run First 10

- Preview URL is available and stable.
- Supabase staging is confirmed non-production.
- RLS smoke passes for client, worker, admin, participant-only messages, reviews, and audit access.
- Browser smoke has no critical console errors.
- Payments remain disabled.
- AI agents remain disabled.
- Tester scripts and observation sheet are ready.

## GO Criteria To Expand To 25

- 8 of 10 testers understand the product proposition.
- 5 of 10 testers complete their assigned flow.
- 0 critical security or trust incidents.
- 0 misleading claims detected in UI or scripts.
- Payment-disabled state is understood.
- No tester believes employment or income is guaranteed.
- Feedback is documented and triaged.
- Top fixes are either completed or accepted as non-blocking.

## NO-GO Criteria

- RLS real smoke is not validated.
- Preview is unstable.
- Users confuse payments as active.
- Users believe employment is guaranteed.
- Users believe income is guaranteed.
- Critical route errors appear in primary flows.
- Private data is exposed to unrelated users.
- Feedback is not traceable.
- Trust/safety copy creates false confidence.

## Decision Output

After the first 10 controlled sessions, record one:

- `GO_TO_FIRST_25_CONTROLLED_USERS`
- `NO-GO_FIX_CRITICAL_ISSUES`
- `NO-GO_ENVIRONMENT_REGRESSION`
- `NO-GO_TRUST_SAFETY_RISK`
