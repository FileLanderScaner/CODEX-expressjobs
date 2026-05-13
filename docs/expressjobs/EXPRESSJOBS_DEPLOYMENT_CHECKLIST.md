# ExpressJobs Deployment Checklist

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Preview Only

- Confirm branch: `codex/expressjobs-autonomous-bootstrap`.
- Confirm production status remains `NO-GO_PRODUCTION`.
- Confirm `.env` files are not staged.
- Run all local checks.
- Run staging env check.
- Run Supabase RLS smoke tests against staging.
- Deploy Preview only.
- Verify `/`, `/client`, `/worker/jobs`, `/admin`, `/pricing`, `/terms`, and `/privacy`.

## Production Block

Production deploy is blocked until a separate release gate approves it.
