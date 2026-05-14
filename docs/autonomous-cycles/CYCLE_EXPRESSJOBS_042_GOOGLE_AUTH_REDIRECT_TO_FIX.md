# Cycle ExpressJobs 042 Google Auth Redirect To Fix

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_GOOGLE_AUTH_REDIRECT_TO_FIX`

## Objective

Fix the Google OAuth Preview callback issue after Supabase Auth logs showed the provider flow could reach callback/signup, but the app flow still needed a correct Preview callback URL.

## Changes

- Updated the social auth helper so browser OAuth redirects use `window.location.origin`.
- Kept the non-browser fallback on configured `NEXT_PUBLIC_APP_URL`.
- Added test coverage for browser-origin OAuth redirect behavior.
- Deployed a new Vercel Preview without `--prod` and without `vercel promote`.

## Preview

- Preview URL: `https://codex-expressjobs-egq4jtl0u-akuma424-projects.vercel.app`
- Deployment: `dpl_FKaLgBpQHbzjYHvTiVmz8puyGRGy`
- Target: `preview`
- Status: `READY`
- Vercel Production touched: `false`

## Checks

- `SECRET_SCAN=PASS`
- `STAGING_CHECK=PASS`
- `RLS_STATIC=PASS`
- `RLS_SMOKE=PASS`
- `LINT=PASS`
- `TYPECHECK=PASS`
- `TEST=PASS`
- `BUILD=PASS`
- `PRODUCTION_CHECK=PASS_SAFE_NO_GO`
- `GIT_DIFF_CHECK=PASS`

## Browser Smoke

- `BYPASS_SECRET_PRESENT=yes`
- `BYPASS_SECRET_PRINTED=false`
- `BYPASS_URL_LOGGED=false`
- `/auth` loaded with protected Preview bypass header.
- `GOOGLE_BUTTON_VISIBLE=yes`
- `FACEBOOK_BUTTON_VISIBLE=no`
- `INSTAGRAM_BUTTON_VISIBLE=no`
- `OAUTH_REDIRECT_STARTED=yes`
- `OAUTH_REDIRECT_TO_FIXED=yes`
- `OAUTH_REDIRECT_TO_HOST_CLASS=current_preview`
- `OAUTH_REDIRECT_TO_PATH=/auth/callback`
- `GOOGLE_SCREEN_OR_PROVIDER_REDIRECT_REACHED=yes`

Observed non-blocking console issue:

- Vercel Live feedback script blocked by CSP in Preview automation.
- Classified as non-blocking for ExpressJobs OAuth because it is not part of the app login path.

## Decision

- `GOOGLE_AUTH_REDIRECT_TO_FIX=APPLIED`
- `GOOGLE_AUTH_SMOKE=READY_FOR_HUMAN_BROWSER_TEST`
- `CALLBACK_REACHED=not_tested_after_fix`
- `SESSION_CREATED=not_tested_after_fix`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Risks

- Google callback/session creation still requires a human browser login with the staging/test Google account.
- Facebook remains `CONFIG_PENDING`.
- Instagram remains `RESEARCH_PENDING`.
- Security Advisor recheck remains `PENDING_OR_NOT_RECHECKED`.

## Next Mode

`EXPRESSJOBS_GOOGLE_AUTH_HUMAN_CALLBACK_SESSION_VERIFY`
