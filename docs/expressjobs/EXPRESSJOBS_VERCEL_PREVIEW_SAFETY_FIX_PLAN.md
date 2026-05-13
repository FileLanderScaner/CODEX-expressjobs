# ExpressJobs Vercel Preview Safety Fix Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Current Status

`VERCEL_PREVIEW_STATUS=PREVIEW_FAIL_SAFE_BLOCKED`

Current facts:

- Project `codex-expressjobs` exists in scope `akuma424-projects`.
- Deployments created in the activation cycle were removed.
- Git auto-deploy was disconnected.
- No active deployment is approved.
- No Preview URL is valid for testers.

## Risk Detected

Vercel classified deployments from this project as:

```text
target: production
```

This happened for both:

- A local deploy attempted with Preview intent.
- A Git-triggered deployment after repository connection.

This blocks any new deployment attempt until branch targeting and project settings are corrected.

## Safe Fix Plan

1. Open Vercel project settings for `codex-expressjobs`.
2. Confirm the Production Branch.
3. Ensure `codex/expressjobs-autonomous-bootstrap` is not the Production Branch.
4. Confirm project framework settings are Next.js.
5. Configure Preview/Development env vars only.
6. Do not configure Production env vars.
7. Reconnect Git only after branch targeting is confirmed safe.
8. Trigger a Preview deployment from the working branch.
9. Inspect deployment target.
10. Share/use URL only if target is Preview and browser smoke passes.

## Forbidden Actions

- `vercel --prod`
- `vercel promote`
- Production env edits
- Reconnecting Git before branch safety is checked
- Sharing a URL before deployment target is inspected

## Preview Variables Required

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ALLOWED_ORIGINS`
- `APP_ENV=preview`
- `ENABLE_PAYMENTS=false`
- `ENABLE_AI_AGENTS=false`
- `AI_KILL_SWITCH=true`
- `ENABLE_ADMIN_PANEL=false`

## Approval Criteria

Preview is not approved until:

- Deployment target is confirmed not production.
- Preview URL exists.
- Browser smoke passes.
- No secrets are exposed.
- `NO-GO_PRODUCTION` is visible.
- Routes render: `/`, `/pricing`, `/auth`, `/onboarding`, `/client`, `/worker`, `/admin`.
