# ExpressJobs Vercel Env Matrix

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

Values were not printed or pulled. This matrix records only key presence from `vercel env ls preview --format json` and `vercel env ls production --format json`.

## Preview

| Variable | Presence |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `PRESENT` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `PRESENT` |
| `NEXT_PUBLIC_APP_URL` | `NOT_LISTED` |
| `ALLOWED_ORIGINS` | `NOT_LISTED` |
| `APP_ENV` | `PRESENT_VALUE_NOT_READ` |
| `ENABLE_PAYMENTS` | `PRESENT_VALUE_NOT_READ` |
| `ENABLE_AI_AGENTS` | `PRESENT_VALUE_NOT_READ` |
| `AI_KILL_SWITCH` | `PRESENT_VALUE_NOT_READ` |
| `ENABLE_ADMIN_PANEL` | `PRESENT_VALUE_NOT_READ` |
| `NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN` | `PRESENT_VALUE_NOT_READ` |
| `NEXT_PUBLIC_ENABLE_FACEBOOK_LOGIN` | `PRESENT_VALUE_NOT_READ` |
| `NEXT_PUBLIC_ENABLE_INSTAGRAM_LOGIN` | `PRESENT_VALUE_NOT_READ` |

Preview also lists server-side Supabase/Postgres env names. Values were not read. Server-only secret names must never be exposed to frontend code or documentation values.

## Production

Production env names were listed without values to confirm no write operation was needed. No Production env was modified.

`PRODUCTION_ENV_VALUES_READ=false`

`PRODUCTION_ENV_MUTATED=false`

## Required Follow-Up

Before expanding beyond First 10, add or verify Preview-only values for:

- `NEXT_PUBLIC_APP_URL`
- `ALLOWED_ORIGINS`

Do this through Vercel Preview env only, not Production, and do not print values.
