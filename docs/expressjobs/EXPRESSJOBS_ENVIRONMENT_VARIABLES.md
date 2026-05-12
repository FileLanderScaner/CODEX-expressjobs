# ExpressJobs Environment Variables

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

| Variable | Scope | Required | Notes |
| --- | --- | --- | --- |
| `APP_ENV` | server/client | yes | `local`, `preview`, `staging`, or `production` |
| `NEXT_PUBLIC_APP_URL` | client | yes | Public base URL |
| `NEXT_PUBLIC_SUPABASE_URL` | client | staging | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client | staging | Public anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | server-only | later | Never expose to browser |
| `ALLOWED_ORIGINS` | server-only | staging | Comma-separated allowlist |
| `ENABLE_PAYMENTS` | server/client gate | yes | Must remain `false` |
| `ENABLE_AI_AGENTS` | server/client gate | yes | Must remain `false` |
| `AI_KILL_SWITCH` | server/client gate | yes | Must remain `true` |
| `ENABLE_ADMIN_PANEL` | server/client gate | yes | Default `false` |
