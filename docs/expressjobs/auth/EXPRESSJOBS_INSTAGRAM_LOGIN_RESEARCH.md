# ExpressJobs Instagram Login Research

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`INSTAGRAM_LOGIN=RESEARCH_PENDING`

Instagram login is not implemented in Phase 1.

## Research Questions

- Confirm whether Meta Instagram API with Instagram Login applies to the target users.
- Validate whether the login flow supports normal users or is limited to professional, business, or creator accounts.
- Confirm whether Supabase Auth supports Instagram as a native provider for this use case.
- If not native, evaluate Custom OAuth/OIDC or a dedicated third-party identity provider.
- Confirm Meta app review requirements, data permissions, and user data handling.

## Phase 1 Decision

Do not block Google and Facebook readiness on Instagram.

Instagram remains out of production scope until:

- Provider support is confirmed.
- Account-type requirements are clear.
- Privacy and data permissions are reviewed.
- A staging-only proof is planned.

## Guardrails

- Do not add Instagram client IDs or secrets to git.
- Do not enable `NEXT_PUBLIC_ENABLE_INSTAGRAM_LOGIN` for production.
- Do not implement custom OAuth without a separate security review.
