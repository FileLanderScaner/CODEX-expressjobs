# ExpressJobs

ExpressJobs is an MVP for local microjobs in Uruguay/LATAM: clients publish tasks, workers apply, clients accept a worker, participants coordinate, and completed work can receive reviews.

## Current Status

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

This repository is prepared for Vercel Preview/Staging only. Live payments, AI agents, and production release are intentionally disabled until the release gate is passed.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth/Postgres/RLS
- Vercel Preview/Staging
- Vitest for focused validation

## Local Commands

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
```

## Environment

Copy `.env.example` to `.env.local` for local development. Do not commit `.env.local`.

Required public variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`
- `APP_ENV`

Server-only variables:

- `SUPABASE_SERVICE_ROLE_KEY`
- `ALLOWED_ORIGINS`

Safety flags:

- `ENABLE_PAYMENTS=false`
- `ENABLE_AI_AGENTS=false`
- `AI_KILL_SWITCH=true`
- `ENABLE_ADMIN_PANEL=false`
