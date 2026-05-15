# ExpressJobs — Autonomous Development Cycle

## Purpose

This file defines a safe autonomous development cycle for ExpressJobs. GitHub is the control-plane. Codex, Supabase, Vercel and human operators must follow the same queue and safety gates.

## Current closest goal

`RLS hardening apply + real RLS smoke PASS`

Do not drift to revenue, demos, banners, affiliates, UI polish or non-essential features until the production blocker is cleared.

## Control-plane sources

Read in this order:

1. `AGENTS.md`
2. `docs/codex/NEXT_ACTION.md`
3. `docs/codex/EXPRESSJOBS_CODEX_RESUME_QUEUE.md`
4. `docs/supabase/SUPABASE_OPERATOR.md`
5. `docs/vercel/VERCEL_OPERATOR.md`
6. `docs/codex/EXPRESSJOBS_AUTONOMOUS_DEVELOPMENT_CYCLE.md`

## Active priority queue

### P0 — Supabase staging write unblock and RLS apply

Mode:

`EXPRESSJOBS_SUPABASE_WRITE_CAPABILITY_UNBLOCK_AND_RLS_APPLY`

Must resolve or report:

- `BLOCKED_SUPABASE_WRITE_CAPABILITY`
- apply only `supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`
- run `npm run rls:smoke`
- prove client/worker self-promotion is blocked

### P1 — Production closeout fast path

Mode:

`EXPRESSJOBS_PRODUCTION_CLOSEOUT_FAST_PATH`

Requires P0 success or exact P0 blocker.

### P2 — Final Preview and Production Env Gate

Mode:

`EXPRESSJOBS_FINAL_PREVIEW_AND_PRODUCTION_ENV_GATE`

Only after:

`RLS_ROLE_ESCALATION_FIX=APPLIED_AND_SMOKE_PASS`

### P3 — Growth/demo work

Mode:

`EXPRESSJOBS_DEMO_LANDING_EXAMPLES`

Only after production path is moving or user explicitly changes priority.

## Cycle rules

Each autonomous cycle must:

1. Read all control-plane files listed above.
2. Identify the closest goal.
3. Refuse to drift into lower-priority work if P0 is still blocked.
4. Execute only safe actions.
5. Run applicable checks.
6. Update GitHub issues.
7. Commit docs/status changes.
8. Generate the next `NEXT_CODEX_PROMPT`.
9. Stop when human approval, credentials, production deploy, payments or external write capability are required.

## Allowed autonomous actions

- Edit documentation.
- Edit tests.
- Edit local code that does not deploy production.
- Prepare migrations but not apply to production.
- Apply staging migration only if secure staging write capability exists and the migration is approved.
- Run local checks.
- Create/update GitHub issues and PRs.
- Prepare Vercel env matrix without printing secrets.
- Prepare production approval docs.

## Blocked autonomous actions

- `vercel --prod`
- `vercel promote`
- PayPal live activation
- real payments inside app
- Supabase production writes
- disabling or relaxing RLS
- committing secrets or env files
- printing secrets
- contacting real users automatically
- public production deploy without explicit human approval

## Required cycle report

Every cycle must output:

```text
# ExpressJobs Director Report

## Modo ejecutado
## Commit final
## Closest goal
## What changed
## Checks
## GitHub issues updated
## Current GO/NO-GO
## Exact blocker if NO-GO
## Human action required
## Next mode
## NEXT_CODEX_PROMPT
```

## Current issue routing

- `#10`: RLS role escalation blocker
- `#17`: Production closeout fast path
- `#18`: Supabase write capability unblock
- `#16`: Demo landing examples, lower priority

## Current safe status

```text
PRODUCTION_STATUS=NO-GO_PRODUCTION
PAYPAL_LIVE=OFF
ENABLE_PAYMENTS=false until payment gate passes
AI_AGENTS=OFF
RLS_ROLE_HARDENING_APPLY=BLOCKED_SUPABASE_WRITE_CAPABILITY
```

## Success definition for current phase

The current phase is successful only when:

```text
RLS_ROLE_ESCALATION_FIX=APPLIED_AND_SMOKE_PASS
```

Then GitHub may move the project to:

`EXPRESSJOBS_FINAL_PREVIEW_AND_PRODUCTION_ENV_GATE`
