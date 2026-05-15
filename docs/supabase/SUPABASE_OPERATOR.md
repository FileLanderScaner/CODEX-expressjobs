# ExpressJobs — Supabase Operator Instructions

## Purpose

This file lets Codex, Supabase MCP, or a human operator continue Supabase work from GitHub without guessing the next step.

## Current closest Supabase goal

Apply the prepared RLS role hardening migration to Supabase staging and run real RLS smoke.

Current blocker:

`RLS_ROLE_HARDENING_APPLY=BLOCKED_SUPABASE_WRITE_CAPABILITY`

Prepared migration:

`supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`

Expected staging project:

- Project ref: `gnsfyvsodslnehszanra`
- Known name: `supabase-expressjobs`

---

## Non-negotiable safety rules

- Do not touch Supabase production.
- Do not apply unapproved migrations.
- Do not disable RLS.
- Do not relax policies.
- Do not print secrets.
- Do not commit `.env`, `.env.local`, `.env.rls`, service-role keys, access tokens, logs, zips, or screenshots with secrets.
- Do not paste secrets into GitHub issues, docs, comments, or chat.
- Keep `PRODUCTION_STATUS=NO-GO_PRODUCTION` until RLS hardening is applied and smoke passes.

---

## Approved migration set

Only this migration is approved for the immediate apply gate:

`supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`

If the apply mechanism attempts to apply additional migrations, stop and report:

`BLOCKED_UNAPPROVED_MIGRATION_SET`

---

## Required pre-apply checks

Run before applying anything:

```bash
npm run secret:scan
npm run staging:check
npm run test:rls:static
npm run production:check
git diff --check
```

If credentials are missing, report exactly:

`BLOCKED_SUPABASE_WRITE_CAPABILITY`

Do not fake PASS.

---

## Required apply flow

1. Confirm the project is staging:
   - `gnsfyvsodslnehszanra`
   - `supabase-expressjobs`

2. Confirm capability without printing values:
   - Supabase MCP authenticated: yes/no
   - Supabase CLI available: yes/no
   - Supabase access token present: yes/no
   - Project linked: yes/no

3. Apply only:

```text
supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql
```

4. Do not apply any other migration.

---

## Required post-apply verification

After apply, verify:

- broad `UPDATE` on `public.ej_profiles` for `authenticated` is revoked.
- `authenticated` cannot update `role`.
- `authenticated` can still update safe fields:
  - `full_name`
  - `phone`
  - `city`
  - `updated_at`
- `profiles_update_own_safe_fields` exists.
- old unsafe `profiles_update_own` is removed or replaced.
- trigger `ej_profiles_prevent_role_self_update` exists.
- function `ej_prevent_profile_role_self_update` exists with explicit `search_path`.
- RLS remains enabled.

---

## Required smoke checks

Run:

```bash
npm run rls:smoke
```

Must prove:

- client self-promotion to admin is blocked.
- worker self-promotion to admin is blocked.
- normal user cannot read admin audit logs after a self-promotion attempt.
- normal user can edit safe own profile fields.
- general RLS smoke remains PASS.

---

## Required full gate

Run after apply:

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

---

## Required GitHub updates

Update these issues:

- `#10` RLS role escalation blocker
- `#17` Production closeout fast path
- `#18` Supabase write capability unblock

Do not close `#10` until the migration is applied and real smoke passes.

---

## Next prompt for Supabase/Codex

```text
CODEX_PROMPT — EXPRESSJOBS_SUPABASE_WRITE_CAPABILITY_UNBLOCK_AND_RLS_APPLY

Read first:
- AGENTS.md
- docs/codex/NEXT_ACTION.md
- docs/codex/EXPRESSJOBS_CODEX_RESUME_QUEUE.md
- docs/supabase/SUPABASE_OPERATOR.md

Execute the Supabase staging apply gate for:
supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql

If write capability is missing, do not apply anything. Report the exact missing capability.

If write capability is available, apply only the approved migration, run the full RLS smoke, update issues #10/#17/#18, and produce an ExpressJobs Director Report.
```

---

## Success state

Only mark success when:

`RLS_ROLE_ESCALATION_FIX=APPLIED_AND_SMOKE_PASS`

Then the next production mode becomes:

`EXPRESSJOBS_FINAL_PREVIEW_AND_PRODUCTION_ENV_GATE`
