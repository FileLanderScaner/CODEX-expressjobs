# Cycle ExpressJobs 037 Google Auth Preview Smoke

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Modo ejecutado

`EXPRESSJOBS_GOOGLE_AUTH_PREVIEW_SMOKE`

## Checks

- `git branch --show-current`: PASS (`codex/expressjobs-autonomous-bootstrap`)
- `git status --short`: PASS, clean before smoke
- `BYPASS_SECRET_PRESENT`: yes, available from User environment without printing value
- `npm run secret:scan`: PASS
- `npm run staging:check`: PASS
- `npm run test:rls:static`: PASS
- `npm run rls:smoke`: PASS (`EXPRESSJOBS_RLS_STAGING_PASS`)
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test`: PASS
- `npm run build`: PASS
- `npm run production:check`: PASS (`PRODUCTION_STATUS=NO-GO_PRODUCTION`)
- `git diff --check`: PASS

## Preview Deployment

- Deployed Preview without `--prod`.
- No `vercel promote`.
- Deployment: `dpl_2qvWaFzKKu7QYJ2qJagFvChVQCLF`
- Preview URL: `https://codex-expressjobs-f2mj43l8n-akuma424-projects.vercel.app`
- Target: `preview`
- Ready: yes
- Production touched: false

## Preview Auth Smoke

- `/auth` HTTP 200 with bypass header.
- Google button visible: yes.
- Facebook button visible: no.
- Instagram button visible: no.
- Bypass secret in HTML: no.
- Live payments visible: no.
- AI agents production visible: no.

## OAuth Redirect Smoke

- Clicked `Continue with Google` using browser automation with the bypass header.
- OAuth redirect started: yes.
- Callback reached: no.
- Session created: not tested.
- Error classification: `redirect_uri_mismatch`.

## Decision

- `GOOGLE_LOGIN=BLOCKED_PROVIDER_CONFIG`
- `GOOGLE_AUTH_SMOKE=BLOCKED_PROVIDER_CONFIG`
- `FACEBOOK_LOGIN=CONFIG_PENDING`
- `INSTAGRAM_LOGIN=RESEARCH_PENDING`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Riesgos

- Google OAuth client redirect URI must be corrected manually.
- New Preview deployment URL must be included in Supabase redirect allow-list if exact URLs are used.
- Do not put Vercel bypass query parameters into OAuth redirect configuration.
- Do not enable Facebook or Instagram until their own gates exist.

## Proximo modo seguro

`EXPRESSJOBS_GOOGLE_AUTH_REDIRECT_URI_FIX_GUIDE`
