# ExpressJobs GitHub Issue Routing

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Routing Matrix

| Issue signal | Required labels | Codex action |
| --- | --- | --- |
| UI/UX feature | `type-feature`, `status-ready-for-codex`, `codex-safe` | Implement in branch and PR. |
| Bug without production/payment risk | `type-bug`, `status-ready-for-codex`, `codex-safe` | Reproduce, fix, test, PR. |
| Auth issue | `type-auth`, `risk-auth` | Inspect and fix if no secrets are needed; otherwise human gate. |
| RLS issue | `type-rls`, `risk-rls`, `codex-human-gate-required` | Plan first; no remote write without approval. |
| Payment sandbox | `type-payment`, `phase-paid-pilot`, `codex-human-gate-required` | Implement sandbox only if no secrets are needed. |
| PayPal live | `risk-payment-live`, `codex-do-not-run` | Block until explicit human live gate. |
| Production | `risk-production`, `status-needs-human`, `codex-do-not-run` | Block. |
| Secret exposure | `type-security`, `risk-secret`, `status-needs-human` | Redact, document, rotate via human/admin path. |

## Human Approval Required

Human approval is required for:

- Production.
- PayPal live.
- Supabase remote writes.
- RLS relaxation.
- Service role usage beyond local staging scripts.
- Real user contact.
- Real personal data.

## Evidence

Each issue closed by a PR should link:

- PR.
- Checks.
- Docs/status updates.
- Preview URL if relevant.
- Residual risks.
