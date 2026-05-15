# AGENTS.md — ExpressJobs Codex Operating Instructions

## Project

ExpressJobs / Trabajos Rapidos

## Current closest goal

Reach safe public production as quickly as possible.

The closest technical blocker is:

`RLS hardening apply + real RLS smoke PASS`

Do not drift to revenue, demos, banners, affiliates, UI polish, or extra features unless the user explicitly changes the closest goal.

---

## Current state

- Production: `NO-GO_PRODUCTION`
- Branch: `codex/expressjobs-autonomous-bootstrap`
- Revenue/manual sales: `READY_MANUAL_SALES_ONLY`
- Production blocker: `RLS_ROLE_HARDENING_APPLY=BLOCKED_SUPABASE_WRITE_CAPABILITY`
- Prepared migration: `supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`
- PayPal live: OFF
- In-app payments: blocked
- AI agents: OFF

Important GitHub issues:

- `#10` RLS role escalation blocker
- `#17` Production closeout fast path
- `#18` Supabase write capability unblock
- `#16` Demo landing examples, lower priority until production path is unblocked

Primary queue file:

`docs/codex/EXPRESSJOBS_CODEX_RESUME_QUEUE.md`

Read it before starting any task.

---

## Non-negotiable safety rules

- Do not use `vercel --prod` without explicit human approval in the current session.
- Do not use `vercel promote` without explicit human approval in the current session.
- Do not enable PayPal live.
- Do not create real payments inside the app.
- Do not touch Supabase production.
- Do not apply unapproved migrations.
- Do not disable RLS.
- Do not relax RLS policies.
- Do not print secrets.
- Do not commit `.env`, `.env.local`, `.env.rls`, `.vercel`, logs, zips, credentials, tokens, screenshots with secrets, or payment details.
- Do not hardcode personal phone numbers, bank accounts, card details, or private payment identifiers in public repo files.
- Keep `PRODUCTION_STATUS=NO-GO_PRODUCTION` until all production gates pass.

---

## Priority order

### P0 — Supabase write capability unblock and RLS apply

Run first when Codex is available:

`EXPRESSJOBS_SUPABASE_WRITE_CAPABILITY_UNBLOCK_AND_RLS_APPLY`

Source prompt:

`docs/codex/EXPRESSJOBS_CODEX_RESUME_QUEUE.md`

Expected result:

- Supabase write capability diagnosed.
- If possible, apply only:
  `supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`
- Run real RLS smoke.
- Verify client/worker self-promotion to admin is blocked.
- Update issues #10, #17, #18.

### P1 — Production closeout fast path

Run after P0 passes or if P0 is blocked and needs documentation:

`EXPRESSJOBS_PRODUCTION_CLOSEOUT_FAST_PATH`

Expected result:

- Production readiness docs updated.
- Payments remain OFF if PayPal is blocked.
- Final blockers clearly listed.

### P2 — Final Preview and Production Env Gate

Run only after RLS role hardening is applied and smoke passes.

### P3 — Demo landing examples

Run only after production path is unblocked, or if the user explicitly switches back to sales assets.

---

## Default checks

Run these whenever code or docs are changed and scripts exist:

```bash
npm run secret:scan
npm run lint
npm run typecheck
npm run test
npm run build
npm run production:check
git diff --check
```

For RLS/security work, also run:

```bash
npm run staging:check
npm run test:rls:static
npm run rls:smoke
```

If a check cannot run because credentials/capability are missing, report it exactly as blocked. Do not fake PASS.

---

## Reporting format

Every cycle must end with:

```text
# ExpressJobs Director Report

## Modo ejecutado
## Commit final
## Estado production
## Estado Supabase/RLS
## Estado Vercel
## Estado PayPal
## Checks
## Bloqueo exacto si NO-GO
## Acción humana exacta requerida
## Próximo modo elegido
## NEXT_CODEX_PROMPT
```

---

## Drift control

If a requested action does not help the closest goal, state that it is deferred and return to the closest goal.

Current closest goal:

`RLS hardening apply + real RLS smoke PASS`
