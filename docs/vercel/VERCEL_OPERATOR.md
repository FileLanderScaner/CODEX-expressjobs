# ExpressJobs — Vercel Operator Instructions

## Purpose

This file lets Codex, Vercel MCP/CLI, or a human operator continue Vercel work from GitHub without guessing the next step.

## Current closest Vercel goal

Prepare final Preview and Production environment gates, but do not deploy production until the Supabase RLS role hardening gate passes.

Production remains:

`NO-GO_PRODUCTION`

---

## Dependency before production

Do not deploy or promote production until Supabase reports:

`RLS_ROLE_ESCALATION_FIX=APPLIED_AND_SMOKE_PASS`

Relevant Supabase file:

`docs/supabase/SUPABASE_OPERATOR.md`

Relevant issues:

- `#10` RLS role escalation blocker
- `#17` Production closeout fast path
- `#18` Supabase write capability unblock

---

## Non-negotiable safety rules

- Do not run `vercel --prod` without explicit human approval in the current session.
- Do not run `vercel promote` without explicit human approval in the current session.
- Do not modify Vercel Production env vars without explicit human approval.
- Do not disable Deployment Protection without explicit human approval.
- Do not expose Deployment Protection bypass tokens.
- Do not print secrets.
- Do not commit `.vercel`, env files, logs, tokens, screenshots with secrets, or credentials.
- Do not enable PayPal live.
- Do not enable in-app payments until payment gates pass.
- Keep AI agents off.

---

## Production can ship without PayPal if

All of these are true:

- `ENABLE_PAYMENTS=false`
- PayPal live remains OFF
- Premium/payment CTAs are hidden, disabled, or clearly unavailable
- No in-app payment flow creates real payments
- Manual/outside-app monetization is documented as manual

---

## Required Preview gate

Before production, Preview must pass browser smoke:

- `/` loads.
- `/role` loads.
- `/ofertas` loads.
- `/landing-negocios` loads.
- `/sponsor` loads.
- Google Auth redirect does not use localhost.
- No critical console errors.
- No live payment claims.
- No PayPal live scripts.
- No AI agent/admin panel enabled publicly.

---

## Required Production env matrix

Verify presence without printing values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`
- `ALLOWED_ORIGINS`
- `APP_ENV=production`
- `ENABLE_PAYMENTS=false`
- `ENABLE_AI_AGENTS=false`
- `AI_KILL_SWITCH=true`
- `ENABLE_ADMIN_PANEL=false`

Optional and must remain disabled unless explicitly approved:

- `ENABLE_AD_SLOTS=false`
- `ENABLE_SPONSORED_BANNERS=false`
- `ENABLE_AFFILIATE_LINKS=false`

PayPal live vars must not be required for production launch if payments are disabled.

---

## Required local checks before final production approval

```bash
npm run secret:scan
npm run staging:check
npm run test:rls:static
npm run rls:smoke
npm run lint
npm run typecheck
npm run test
npm run build
npm run production:check
git diff --check
```

If any check fails or is blocked, production remains:

`NO-GO_PRODUCTION`

---

## Allowed Vercel work before production

Allowed without production deploy:

- Inspect Preview deployments.
- Inspect env presence without values.
- Run Preview browser smoke.
- Update docs.
- Prepare production env matrix.
- Prepare human approval checklist.

Not allowed without explicit approval:

- `vercel --prod`
- `vercel promote`
- modifying Production env vars
- disabling protection

---

## Required GitHub updates

Update issue `#17` with:

- Preview smoke result
- Production env presence result
- Production GO/NO-GO decision
- exact blocker if NO-GO
- human approval required if GO

---

## Next prompt for Vercel/Codex

```text
CODEX_PROMPT — EXPRESSJOBS_FINAL_PREVIEW_AND_PRODUCTION_ENV_GATE

Read first:
- AGENTS.md
- docs/codex/NEXT_ACTION.md
- docs/codex/EXPRESSJOBS_CODEX_RESUME_QUEUE.md
- docs/supabase/SUPABASE_OPERATOR.md
- docs/vercel/VERCEL_OPERATOR.md

Precondition:
Only continue if `RLS_ROLE_ESCALATION_FIX=APPLIED_AND_SMOKE_PASS`.
If not, stop and return to Supabase gate.

Goal:
Prepare final Vercel Preview and Production env gate without deploying production automatically.

Rules:
- Do not use `vercel --prod`.
- Do not use `vercel promote`.
- Do not modify Production envs without explicit approval.
- Do not print secrets.
- Keep payments disabled unless PayPal gates passed.

Run:
- Preview smoke.
- Env presence check without values.
- production:check.
- full local gate.

Output:
ExpressJobs Director Report with PRODUCTION_GO/NO-GO and exact final command only if human approval is required.
```

---

## Success state

Only mark Vercel production ready when:

- RLS hardening applied + smoke PASS.
- Preview smoke PASS.
- Production env matrix PASS.
- `production:check` PASS.
- PayPal live OFF / payments disabled.
- explicit human approval pending.

Then status may become:

`READY_FOR_HUMAN_PRODUCTION_APPROVAL`

Not automatic production.
