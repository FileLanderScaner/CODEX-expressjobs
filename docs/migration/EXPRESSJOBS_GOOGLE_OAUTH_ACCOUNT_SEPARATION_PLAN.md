# ExpressJobs Google OAuth Account Separation Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Objective

Separate Google/OAuth from the user's personal Google account and prepare ExpressJobs / Trabajos Rapidos to use a project-owned Google Cloud project and OAuth Web Client.

This is a Google-only preparation cycle. It does not migrate GitHub, Vercel, Supabase, PayPal, domains, billing, or production.

## Keep Unchanged

| Surface | Current state | Action |
| --- | --- | --- |
| GitHub | `FileLanderScaner/CODEX-expressjobs` | Keep unchanged |
| Vercel | `akuma424-projects/codex-expressjobs` | Keep unchanged |
| Supabase | `gnsfyvsodslnehszanra` | Keep unchanged |
| PayPal | Live payments off | Keep off |
| Production | `NO-GO_PRODUCTION` | Keep blocked |

## Separate

- Google Cloud Project.
- OAuth consent screen.
- OAuth Web Client.
- Google Client ID.
- Google Client Secret.

No OAuth Client, Client Secret, downloaded credential, or Google API key should be created automatically by Codex unless the user explicitly authorizes it in that cycle.

## Current App OAuth Wiring

| Item | Current value |
| --- | --- |
| Public enable flag | `NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN` |
| Default flag value | `false` |
| Social providers whitelisted in app | `google`, `facebook` |
| Google button behavior | Hidden when Supabase public config is missing or no social provider flag is enabled |
| OAuth start helper | `signInWithSocialOAuth()` in `src/lib/social-auth.ts` |
| App callback route | `/auth/callback` |
| Redirect builder | current browser origin + `/auth/callback` |
| New OAuth profile role | `client` |
| Public admin assignment | Blocked by app logic and RLS hardening |

The app does not require `GOOGLE_CLIENT_SECRET` in `.env.example`; the Google secret belongs in Supabase Auth Provider Google only.

## Google Cloud Target Setup

Use or create a Google Cloud Project owned by ExpressJobs / Trabajos Rapidos.

OAuth consent screen:

- App name: `ExpressJobs / Trabajos Rapidos`
- User support email: project-owned email
- Developer contact email: project-owned email
- Scopes: `openid`, `email`, `profile`
- Publishing status: `testing` until Preview/Staging smoke passes

OAuth Client:

- Type: Web application
- Name: `ExpressJobs Web OAuth Client`

Authorized JavaScript origins:

- `http://localhost:3000`
- A stable Vercel Preview/Staging origin if available

Authorized redirect URIs:

- `https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback`

Do not use arbitrary wildcard Preview URLs. Google OAuth requires exact origins/redirects; prefer a stable staging domain or the exact Preview URL selected for validation.

## Supabase Provider Setup

In Supabase project `gnsfyvsodslnehszanra`, configure Authentication Providers -> Google:

- Enable Google provider.
- Load the new project-owned Google Client ID.
- Load the new project-owned Google Client Secret.
- Confirm the Supabase redirect URL is exactly `https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback`.

Do not paste secrets into chat, GitHub, docs, screenshots, or `.env` files. Do not modify Supabase Auth Provider Google until the user explicitly authorizes it and the new credentials are available through a secure channel.

## Vercel Preview/Staging Setup

Only Preview/Staging may be changed in a future authorized cycle:

| Variable | Environment | Required state |
| --- | --- | --- |
| `NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN` | Preview/Staging | `true` only after Supabase Google provider is configured |
| `NEXT_PUBLIC_SUPABASE_URL` | Preview/Staging | existing staging Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Preview/Staging | existing staging anon key |
| `NEXT_PUBLIC_APP_URL` | Preview/Staging | exact stable Preview/Staging origin if server-render fallback is needed |

Do not modify Vercel Production env vars. Do not use `vercel --prod` or `vercel promote`.

## Read-Only Access Findings

- `gcloud` is not installed or not available in the current shell, so Google Cloud account/project state could not be inspected.
- Supabase provider write/readiness check was not changed; CLI project listing did not provide a confirmed provider state in this cycle.
- Vercel env values were not read or changed.

## Blockers

| Blocker | Meaning | Human action |
| --- | --- | --- |
| `BLOCKED_GOOGLE_CLOUD_ACCESS` | Google Cloud CLI/project state is unavailable to Codex | Use the project-owned Google account to create/confirm the project and OAuth client |
| `BLOCKED_SUPABASE_GOOGLE_PROVIDER_WRITE_ACCESS` | Supabase Google provider was not modified | Load the new Client ID/Secret in Supabase Dashboard when ready |
| `BLOCKED_VERCEL_PREVIEW_ENV_ACCESS` | Preview/Staging Google flag was not enabled | Enable `NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=true` only after Supabase provider is configured |

## Manual Checklist

1. In Google Cloud, create/confirm project-owned project.
2. Configure consent screen with project-owned emails.
3. Create Web OAuth Client.
4. Add `http://localhost:3000` and the selected stable Preview/Staging origin.
5. Add `https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback`.
6. Copy Client ID and Client Secret only into Supabase Dashboard.
7. Enable Google provider in Supabase.
8. Enable `NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=true` only in Vercel Preview/Staging.
9. Smoke `/auth -> Google -> /auth/callback -> /role`.
10. Keep Production `NO-GO_PRODUCTION`.

