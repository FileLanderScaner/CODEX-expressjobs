# ExpressJobs - Next Action for Codex

## Run this next

`EXPRESSJOBS_PREVIEW_ROUTE_SMOKE_EXECUTION_NO_DB_CHANGES`

## Why

Cycle 017 expanded the Vercel Preview smoke script so public route QA can be executed with one command once the Preview URL is available.

Latest validated branch head:
`b062cb7c62a2332fdc6138be51a887c30ac22966`

Routes covered by smoke:
- `/`
- `/como-funciona`
- `/jobs`
- `/jobs/open`
- `/register`
- `/auth`
- `/role`
- `/pricing`
- `/production-paused`

Validation passed:
- `JSON parse`: PASS
- `npm run production:check`: PASS
- `npm run staging:check`: PASS
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run build`: PASS
- Vercel remote status: SUCCESS

Production remains:
`NO-GO_PRODUCTION`

## Branch / PR

Use branch:
`codex/expressjobs-supabase-security-advisor-closeout`

PR:
`https://github.com/FileLanderScaner/CODEX-expressjobs/pull/44`

Do not push directly to `main`.

## Preview smoke command

Use a real Vercel Preview URL, never the production host:

```powershell
cd C:\CODEX-expressjobs-repo
npm run smoke:preview -- --url https://preview-deployment.vercel.app
```

Expected safe output:

```txt
PREVIEW_SMOKE=PASS https://preview-deployment.vercel.app
PREVIEW_SMOKE_RESULTS=...
```

401 from Vercel Deployment Protection is acceptable for protected Preview routes. 5xx is not acceptable.

## Critical Supabase branch-capacity rule

Before any new migration, DDL apply, Supabase Preview Branch workflow, or Advisor closeout apply:

1. List Supabase branches for project `gnsfyvsodslnehszanra`.
2. Confirm available branch capacity.
3. If capacity is full or branches are failed/broken, stop.
4. Report `BLOCKED_SUPABASE_BRANCH_CAPACITY`.
5. Do not reset/delete branches without explicit human authorization.
6. Do not apply new migrations until branch capacity and branch state are resolved.

## Do not do

- Do not deploy production.
- Do not run `vercel --prod`.
- Do not run `vercel promote`.
- Do not mutate Vercel Production env vars.
- Do not activate PayPal live.
- Do not process real payments.
- Do not print secrets.
- Do not relax RLS.
- Do not apply destructive migrations.
- Do not create new Supabase branches without branch-capacity preflight.
- Do not reset/delete Supabase branches without explicit authorization.

## Tasks

1. Confirm PR #44 remote checks remain green.
2. Copy the latest Vercel Preview deployment URL.
3. Run `npm run smoke:preview -- --url <preview-url>`.
4. Confirm `PREVIEW_SMOKE=PASS`.
5. Document route results.
6. Keep production blocked.

## Expected output

A Director Report that says one of:

- `WEBAPP_PUBLIC_ROUTES_QA_PASS_NO_PRODUCTION`
- or `WEBAPP_PUBLIC_ROUTES_QA_BLOCKED`
- or `BLOCKED_VERCEL_ACCESS`
- or `BLOCKED_SECURITY_RISK`

Production remains `NO-GO_PRODUCTION`.
