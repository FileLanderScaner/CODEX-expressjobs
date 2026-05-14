# ExpressJobs Supabase Tooling Audit

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `SUPABASE_TOOLING_AUDIT=PARTIAL_PASS`
- `SUPABASE_CLI=AVAILABLE`
- `SUPABASE_CLI_VERSION=2.98.2`
- `SUPABASE_MCP=MISSING_AUTH_IN_CURRENT_SESSION`
- `EDGE_FUNCTIONS_REMOTE_LIST=BLOCKED_MCP_AUTH_REQUIRED`
- `SECURITY_ADVISOR_RECHECK=BLOCKED_MCP_AUTH_REQUIRED`

## Findings

| Tooling | Status | Notes |
| --- | --- | --- |
| Supabase CLI | `AVAILABLE` | `npx supabase --version` returned `2.98.2`. |
| Supabase MCP | `MISSING_AUTH_IN_CURRENT_SESSION` | Read-only calls returned `Auth required`. |
| Edge Functions | `PLAN_READY_REMOTE_NOT_VERIFIED` | MCP listing was blocked by auth; no local Edge Function exists for payments. |
| Auth Hooks | `PLAN_READY_NOT_CONFIGURED` | Useful for custom claims later, not needed for current Google OAuth PASS. |
| Custom Access Token Hook | `FUTURE_OPTION` | Could centralize roles in `app_metadata`; do not add until required. |
| Extensions | `REMOTE_NOT_VERIFIED` | MCP extension list blocked by auth. |
| PayPal MCP / Agent Toolkit | `DO_NOT_USE_FOR_REAL_MONEY` | PayPal connector has invoice tools; do not use for this app's paid pilot. Build sandbox integration explicitly. |

## Supabase Payment Readiness

Existing:

- `ej_payment_records` exists.
- RLS is enabled.
- Users can select own payment records; admins can select all through admin helper.

Missing:

- Dedicated subscriptions table.
- Verified PayPal webhook event table.
- Server-side mutation path for paid status.
- Sandbox webhook verification.
- Admin audit integration for payment state changes.

## Recommendation

Use Supabase CLI locally for migrations and Supabase MCP only after read-only auth is restored. Do not grant write-capable MCP or apply payment migrations until a human approves the sandbox implementation cycle.
