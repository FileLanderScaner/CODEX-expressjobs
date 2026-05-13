# ExpressJobs Vercel Preview Setup

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Allowed

- Vercel Preview deployments.
- Staging environment variables.
- Build validation with `npm run build`.

## Forbidden

- `vercel --prod`
- `vercel promote`
- Production env changes
- Live payment credentials

## Preview Variables

- `APP_ENV=preview`
- `NEXT_PUBLIC_APP_URL=<preview-url>`
- `NEXT_PUBLIC_SUPABASE_URL=<staging-supabase-url>`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=<staging-anon-key>`
- `SUPABASE_SERVICE_ROLE_KEY=<server-only-staging-key>`
- `ALLOWED_ORIGINS=<preview-url>`
- `ENABLE_PAYMENTS=false`
- `ENABLE_AI_AGENTS=false`
- `AI_KILL_SWITCH=true`
- `ENABLE_ADMIN_PANEL=false`

## Build Settings

- Framework: Next.js
- Build command: `npm run build`
- Install command: `npm install` or Vercel default
- Output: Next.js managed output

## Required Pre-Deploy Gates

- `npm run secret:scan`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run test:rls:static`
- `npm run build`
- `npm run staging:check` with Preview env vars available

## Blocked State

If Preview env vars or Vercel access are unavailable, status is `BLOCKED_VERCEL_ACCESS`. Do not deploy production as a workaround.
