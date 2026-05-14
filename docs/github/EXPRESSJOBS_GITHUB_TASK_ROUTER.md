# ExpressJobs GitHub Task Router

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `GITHUB_TASK_ROUTER=READY`
- `GITHUB_CLI=MISSING_IN_CURRENT_SHELL`
- `LABELS=DOCUMENTED_MANUAL_COMMANDS`
- `ISSUE_TEMPLATES=READY`
- `ACTIONS_GATES=READY`

## Operating Model

```text
idea / bug / risk
-> issue template
-> labels
-> Codex-safe decision
-> branch
-> PR
-> GitHub Actions
-> evidence
-> human approval if needed
-> merge
```

## Autonomy Rules

Codex can work autonomously only when an issue or prompt is:

- `codex-safe`
- `codex-autonomous-allowed`
- not labeled with live payment, production, secret, destructive data, RLS relaxation, or real user contact risk

Codex must stop for human approval when any of these appear:

- `codex-human-gate-required`
- `risk-production`
- `risk-payment-live`
- `risk-secret`
- `risk-rls`
- `risk-data-loss`
- `risk-user-contact`

Codex must not run when:

- `codex-do-not-run`
- production deployment is requested
- PayPal live or real money is requested
- real users would be contacted
- secrets would need to be pasted or printed

## Required Evidence Per PR

- Summary of changes.
- Risk classification.
- Checks run.
- Preview evidence if UI changed.
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`.
- Payment live status.
- Whether real users/data were involved.

## Seed Issues

Because `gh` is not available in this shell, seed issues are documented in `docs/github/EXPRESSJOBS_SEED_ISSUES_MANUAL_COMMANDS.md` and were not created automatically.
