# ExpressJobs Security Audit

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Result

`SECURITY_AUDIT_STATUS=PASS_WITH_PAID_PILOT_BLOCKERS`

The pre-expansion security audit passed for controlled internal First 10 testers. It does not approve First 25, paid pilot, or production.

## Gate Results

| Area | Status | Evidence |
| --- | --- | --- |
| Auth security | `PASS` | Google OAuth callback exchanges session, creates safe default profile, and redirects to `/role`. |
| RLS security | `PASS` | Static RLS tests and real staging RLS smoke passed. |
| Payment security | `PASS_FOR_CODE_ONLY_BLOCKED_FOR_PAID_PILOT` | Live blocked, create-subscription grants no premium, webhook signature required. Resource binding is pending before paid pilot. |
| Secrets security | `PASS` | Secret scan passed and forbidden env/log/zip files are not tracked. |
| Production safety | `PASS_SAFE_NO_GO` | Production guard passed with `NO-GO_PRODUCTION`. |
| Tester safety | `PASS_FOR_FIRST_10_CONTROLLED_INTERNAL_ONLY` | Internal controlled tester path remains allowed; wider cohorts remain blocked. |

## Commands

| Command | Result |
| --- | --- |
| `npm run secret:scan` | `PASS` |
| `npm run staging:check` | `PASS` |
| `npm run test:rls:static` | `PASS` |
| `npm run rls:smoke` | `PASS` |
| `npm run lint` | `PASS` |
| `npm run typecheck` | `PASS` |
| `npm run test` | `PASS` |
| `npm run build` | `PASS` |
| `npm run production:check` | `PASS_SAFE_NO_GO` |
| `git diff --check` | `PASS` |

## Decisions

- `FIRST_10_TESTERS=GO_CONTROLLED_INTERNAL_ONLY`
- `FIRST_25_TESTERS=NO-GO_UNTIL_FIRST_10_RESULTS_AND_RETEST`
- `PAID_PILOT=NO-GO_BLOCKED_EXTERNAL_CREDENTIALS_AND_WEBHOOK_BINDING`
- `PRODUCTION=NO-GO_PRODUCTION`

## Blockers

- `PAYPAL_SANDBOX_SMOKE=BLOCKED_EXTERNAL_CREDENTIALS`
- `PAYPAL_WEBHOOK_RESOURCE_BINDING=PENDING`
- `SECURITY_ADVISOR_RECHECK=PENDING_OR_NOT_RECHECKED`

## Next Mode

`EXPRESSJOBS_FIRST_100_USERS_PREP`
