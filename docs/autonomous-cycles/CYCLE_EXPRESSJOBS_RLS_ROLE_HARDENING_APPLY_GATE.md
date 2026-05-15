# Cycle ExpressJobs RLS Role Hardening Apply Gate

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_SUPABASE_RLS_ROLE_HARDENING_APPLY_GATE`

## Objective

Apply the prepared RLS role hardening migration only to Supabase staging, verify that `ej_profiles.role` self-promotion is blocked, and rerun the real RLS smoke suite.

## Outcome

`RLS_ROLE_HARDENING_APPLY=BLOCKED_SUPABASE_WRITE_CAPABILITY`

No remote migration was applied.

## Target Confirmation

- Expected Supabase staging ref: `gnsfyvsodslnehszanra`
- Expected Supabase project name: `supabase-expressjobs`
- Local Supabase URL ref match: `yes`
- Approved migration exists locally: `yes`
- Commit present: `bcd1a6b Harden ExpressJobs profile role RLS`

## Blocker

Supabase MCP tools are visible, but the remote query failed with `Auth required`. No safe alternative write path was available:

- `SUPABASE_ACCESS_TOKEN=MISSING`
- Direct Postgres URL envs: `MISSING`
- MCP authenticated remote capability: `BLOCKED_AUTH_REQUIRED`

Because this cycle requires a staging write, the safe decision is `BLOCKED_SUPABASE_WRITE_CAPABILITY`.

## Checks

| Check | Result |
| --- | --- |
| `npm run secret:scan` | `PASS` |
| `npm run staging:check` | `BLOCKED_SECURITY_RISK_UNSAFE_FEATURE_FLAGS` |
| `npm run test:rls:static` | `PASS` |
| `npm run rls:smoke` | `NOT_RUN_APPLY_BLOCKED` |
| `npm run lint` | `PASS` |
| `npm run typecheck` | `PASS` |
| `npm run test` | `PASS` |
| `npm run build` | `PASS` |
| `npm run production:check` | `PASS_SAFE_NO_GO` |
| `git diff --check` | `PASS` |

## Staging Check Finding

`npm run staging:check` failed with:

`BLOCKED_SECURITY_RISK: unsafe feature flags for staging.`

The staging guard requires:

- `ENABLE_PAYMENTS=false`
- `ENABLE_AI_AGENTS=false`
- `AI_KILL_SWITCH=true`

Values were not printed.

## Apply Decision

- Migration applied: `no`
- Other migrations applied: `no`
- Supabase production touched: `false`
- RLS disabled: `false`
- RLS relaxed: `false`
- Secrets printed: `false`

## Status

- `RLS_ROLE_ESCALATION_FIX=PREPARED_LOCAL_NOT_APPLIED`
- `RLS_ROLE_HARDENING_APPLY=BLOCKED_SUPABASE_WRITE_CAPABILITY`
- `RLS_REAL_SMOKE_AFTER_APPLY=NOT_RUN_APPLY_BLOCKED`
- `FIRST_10_TESTERS=NO-GO_UNTIL_RLS_ROLE_HARDENING_APPLIED_AND_SMOKE_PASS`
- `FIRST_25_TESTERS=NO-GO`
- `PAID_PILOT=NO-GO`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Next Safe Mode

`EXPRESSJOBS_SUPABASE_RLS_ROLE_HARDENING_APPLY_GATE_RETRY_WITH_AUTH`
