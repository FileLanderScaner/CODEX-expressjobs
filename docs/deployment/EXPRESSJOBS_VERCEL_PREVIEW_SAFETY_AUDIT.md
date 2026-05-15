# ExpressJobs Vercel Preview Safety Audit

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Result

`VERCEL_PREVIEW_SAFETY_AUDIT=PASS_WITH_PROTECTED_BROWSER_SMOKE_BLOCKED`

The audited deployment is a Vercel Preview deployment, not Production. Production was not deployed, promoted, or modified.

## Deployment

| Field | Result |
| --- | --- |
| Project | `codex-expressjobs` |
| Scope | `akuma424-projects` |
| Deployment ID | `dpl_EokYhx4T8NbNh7xiTpCpipz6bmKh` |
| Preview URL | `https://codex-expressjobs-q2apmubra-akuma424-projects.vercel.app` |
| Target | `preview` |
| Status | `Ready` |
| Created | `2026-05-15 00:29:52 America/Montevideo` |

The previously documented Preview `https://codex-expressjobs-egq4jtl0u-akuma424-projects.vercel.app` also inspected as `target=preview` and `Ready`.

## Recent Deployment Scan

`vercel ls --yes` listed recent deployments for `akuma424-projects/codex-expressjobs`; the visible recent page showed Preview deployments only. No Production deployment was created or promoted during this audit.

## Protection

HTTP smoke without a bypass header returned `401 Unauthorized` for all tested routes. This is consistent with Deployment Protection remaining active.

`VERCEL_AUTOMATION_BYPASS_SECRET` was not present in the current Codex process, so no protected browser smoke with bypass was attempted and no bypass value was printed or committed.

## Browser Smoke

`PREVIEW_BROWSER_SMOKE=BLOCKED_PREVIEW_AUTH_401`

This is an access/protection blocker for the current automation process, not an app error. Prior protected browser smoke remains documented as `PASS`, but this audit could not re-run protected browser smoke because the bypass secret was not visible.

## Production Safety

- No `vercel --prod` used.
- No `vercel promote` used.
- No Production env values read.
- No Production env values modified.
- No Production deployment created.
- Production remains `NO-GO_PRODUCTION`.

## Risks

- `VERCEL_AUTOMATION_BYPASS_SECRET=MISSING_IN_CODEX_PROCESS`
- `NEXT_PUBLIC_APP_URL=NOT_LISTED_IN_PREVIEW_ENV`
- `ALLOWED_ORIGINS=NOT_LISTED_IN_PREVIEW_ENV`
- Preview env values were not read, so exact values of safety flags were not verified.

## Decision

- `FIRST_10_TESTERS=GO_CONTROLLED_INTERNAL_ONLY_WITH_EXISTING_PROTECTED_PREVIEW_ACCESS`
- `FIRST_25_TESTERS=NO-GO_UNTIL_FIRST_10_RESULTS_AND_PREVIEW_RESMOKE`
- `PAID_PILOT=NO-GO_BLOCKED_EXTERNAL_CREDENTIALS_AND_WEBHOOK_BINDING`
- `PRODUCTION=NO-GO_PRODUCTION`
