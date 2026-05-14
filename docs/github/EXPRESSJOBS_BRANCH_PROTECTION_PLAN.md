# ExpressJobs Branch Protection Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Recommended Default Branch Protection

Do not apply automatically unless the repository owner approves.

Recommended settings:

- Require a pull request before merging.
- Require at least one approval.
- Require CODEOWNERS review for sensitive paths.
- Require status checks to pass.
- Require branches to be up to date before merge.
- Block force pushes.
- Block branch deletion.
- Do not allow bypass except repository owner/admin.

## Required Checks

- `expressjobs-pr-check`
- `expressjobs-security-gate`
- `expressjobs-production-no-go`
- `expressjobs-docs-check`

## Sensitive CODEOWNERS Paths

- `.github/`
- `supabase/`
- `src/app/auth/`
- `src/lib/social-auth.ts`
- `src/lib/supabase.ts`
- `docs/expressjobs/payments/`
- `docs/expressjobs/supabase/`
- production/release docs

## Human Gate

Rulesets can lock out workflows if misconfigured. Apply manually through GitHub settings after confirming owner access and required checks names.
