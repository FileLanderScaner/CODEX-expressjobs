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
