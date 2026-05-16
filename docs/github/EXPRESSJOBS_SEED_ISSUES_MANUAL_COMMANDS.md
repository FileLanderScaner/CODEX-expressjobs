# ExpressJobs Seed Issues Manual Commands

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `GH_CLI=FOUND`
- `SEED_ISSUES=CREATED`
- `LABELS=CREATED`

Run these commands only after installing and authenticating GitHub CLI. Do not paste secrets.

## Labels

```powershell
$labels = @(
  "P0-critical","P1-high","P2-medium","P3-low",
  "type-feature","type-bug","type-security","type-payment","type-auth","type-rls","type-preview","type-docs","type-growth","type-observability","type-technical-debt",
  "status-triage","status-ready-for-codex","status-in-progress","status-blocked","status-needs-human","status-ready-for-review","status-done",
  "risk-production","risk-payment-live","risk-secret","risk-rls","risk-auth","risk-data-loss","risk-user-contact",
  "phase-first-10","phase-paid-pilot","phase-production-readiness","phase-post-launch",
  "codex-safe","codex-autonomous-allowed","codex-human-gate-required","codex-do-not-run"
)
foreach ($label in $labels) {
  gh label create $label --repo FileLanderScaner/CODEX-expressjobs --force
}
```

## Seed Issues

```powershell
gh issue create --repo FileLanderScaner/CODEX-expressjobs `
  --title "Release gate: First 10 controlled internal testers" `
  --label "type-preview,phase-first-10,status-ready-for-codex,codex-safe" `
  --body "Validate controlled First 10 internal tester launch gates. Production remains NO-GO_PRODUCTION. No real users are contacted automatically."

gh issue create --repo FileLanderScaner/CODEX-expressjobs `
  --title "Payment audit: PayPal sandbox subscription smoke" `
  --label "type-payment,phase-paid-pilot,status-ready-for-codex,codex-human-gate-required,risk-payment-live" `
  --body "Prepare sandbox-only PayPal subscription smoke. Live payments remain OFF. No real money."

gh issue create --repo FileLanderScaner/CODEX-expressjobs `
  --title "Security gate: verify RLS and Auth before paid pilot" `
  --label "type-security,type-rls,type-auth,status-ready-for-codex,codex-safe" `
  --body "Re-run Auth/RLS evidence before paid pilot. Do not relax RLS. Do not use secrets in issue text."

gh issue create --repo FileLanderScaner/CODEX-expressjobs `
  --title "Production gate: paid pilot human approval checklist" `
  --label "phase-paid-pilot,risk-production,status-needs-human,codex-human-gate-required" `
  --body "Human approval checklist for any paid pilot expansion. No production deploy or PayPal live by default."
```

Seed issues were created by Codex in cycle 047:

- `#6` Release gate: First 10 controlled internal testers
- `#7` Payment audit: PayPal sandbox subscription smoke
- `#8` Security gate: verify RLS and Auth before paid pilot
- `#9` Production gate: paid pilot human approval checklist
