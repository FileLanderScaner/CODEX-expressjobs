# ExpressJobs Supabase Edge Functions Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `EDGE_FUNCTIONS_PLAN=READY_FOR_SANDBOX_DESIGN`
- `EDGE_FUNCTIONS_REMOTE_STATUS=NOT_VERIFIED_MCP_AUTH_REQUIRED`

## Candidate Functions

- `paypal-create-subscription`
- `paypal-webhook`
- `paypal-get-subscription-status`

## Security Requirements

- Store PayPal secrets only as Supabase function secrets or server-only Vercel env vars.
- Use sandbox credentials first.
- Verify PayPal webhook signatures before database writes.
- Use service role only inside server/Edge code.
- Never expose service role to the browser.
- Keep RLS enabled on all public tables.
- Keep payment writes server-only.

## Recommendation

For the first implementation, a Next.js route handler is acceptable if deployed only to protected Preview with sandbox credentials. Supabase Edge Functions become preferable when isolating payment secrets and webhook processing from the frontend deployment is required.
