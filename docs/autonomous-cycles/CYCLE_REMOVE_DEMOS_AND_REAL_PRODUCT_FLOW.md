# Cycle Remove Demos And Real Product Flow

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_PRODUCT_UX_REVIEW`

## Objective

Remove public demo/catalog pages and make the public surface behave like a real controlled MVP marketplace for fast local jobs.

## Branch

`codex/remove-demos-real-product-flow`

## PR

https://github.com/FileLanderScaner/CODEX-expressjobs/pull/30

PR #29 was closed as superseded by PR #30.

## Removed Public Routes

- `/demo`
- `/demo/peluqueria`
- `/demo/estetica`
- `/demo/tecnico-reparaciones`
- `/demo/limpieza`
- `/demo/delivery`

## Changes

- Removed `src/app/demo` routed files.
- Removed the public home CTA to `/demo`.
- Reworked home CTA priority around `Publicar un trabajo`, `Buscar trabajos`, `Ingresar / Crear cuenta`, and `/role`.
- Replaced home fake job cards with category navigation into the real worker jobs flow.
- Updated header navigation to real user paths: Inicio, Trabajos, Publicar trabajo, Ofertas, Ingresar.
- Added footer contact with real WhatsApp `097045305` and email `akuma_g1@hotmail.com`.
- Changed worker/client Supabase fallbacks so public UI no longer presents fallback jobs as real jobs.
- Added `/ofertas` local intake form that builds a WhatsApp message to `wa.me/59897045305`.
- Preserved the real marketplace flow hardening from PR #29: worker apply, client accept/reject RPCs, safe role RPC, auth `next` handling, and RLS migration.

## Real Routes Kept

- `/`
- `/auth`
- `/auth/diagnostics`
- `/role`
- `/client`
- `/client/jobs/new`
- `/client/jobs/[id]`
- `/worker/jobs`
- `/worker/jobs/[id]`
- `/ofertas`
- `/landing-negocios`
- `/sponsor`

## Checks

| Check | Result |
| --- | --- |
| `npm run secret:scan` | `PASS` |
| `npm run production:check` | `PASS_SAFE_NO_GO` |
| `npm run guard:no-production-deploy` | `PASS` |
| `npm run test:rls:static` | `PASS` |
| `npm run lint` | `PASS` |
| `npm run typecheck` | `PASS` |
| `npm run test` | `PASS_8_FILES_45_TESTS` |
| `npm run build` | `PASS_NO_DEMO_ROUTES` |
| `git diff --check` | `PASS` |
| `npm run staging:check` | `PASS` |
| `npm run rls:smoke` | `PASS_EXPRESSJOBS_RLS_STAGING_PASS` |
| PR #30 `docs-check` | `PASS` |
| PR #30 `pr-check` | `PASS` |
| PR #30 `security-gate` | `PASS` |
| PR #30 `production-no-go` | `PASS` |
| PR #30 Vercel Preview | `SUCCESS` |
| PR #30 Supabase Preview | `SUCCESS` |

## Autoevaluation

- MVP progress: yes. The public product no longer points users to sales examples and now prioritizes real marketplace actions.
- Technical risk reduced: yes. Public fallback data is no longer presented as real jobs, and marketplace writes remain behind Supabase auth/RLS.
- Security maintained: yes. No production deploy, no production promotion, no Production env mutation, no Supabase production action, no PayPal live, no real payments, no secrets printed, and no RLS relaxation.
- Blocked: canonical staging still needs the marketplace migration applied before the full real browser smoke.
- Highest-impact next step: run Preview checks and staging-only smoke for signup/login -> role -> publish -> worker apply -> client accept.

## External Configuration Still Required

`SUPABASE_REQUIRED`

- Confirm canonical Supabase staging URL.
- Confirm public anon/publishable key.
- Confirm `supabase/migrations/20260516223000_harden_real_marketplace_flow.sql` applied to staging.
- Confirm RLS smoke after migration.
- Confirm email OTP enabled.

`GOOGLE_AUTH_REQUIRED`

- Google Client ID.
- Google Client Secret.
- Supabase Google provider enabled.
- Authorized redirect URI for the active Preview URL.
- Site URL and additional redirect URLs.

`VERCEL_REQUIRED`

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`
- `ALLOWED_ORIGINS`
- `APP_ENV`

`PAYMENTS_REQUIRED`

- Keep payments disabled.
- Do not configure PayPal live.
- Keep `ENABLE_PAYMENTS=false` until explicit human approval.

## Production Status

`NO-GO_PRODUCTION`

## Next Mode

`EXPRESSJOBS_PREVIEW_DEPLOYMENT`

## NEXT_CODEX_PROMPT

Ejecutar `EXPRESSJOBS_PREVIEW_DEPLOYMENT` en `C:\CODEX-expressjobs-repo` para la rama `codex/remove-demos-real-product-flow`. Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`; no usar `vercel --prod`; no usar `vercel promote`; no modificar Vercel Production env vars; no tocar Supabase production; no activar PayPal live; no activar pagos reales; no imprimir secrets; no usar service-role key en cliente. Confirmar que no existen rutas publicas `/demo` ni links publicos a `/demo`. Confirmar que home/header/footer/ofertas apuntan a flujos reales: auth, role, publicar trabajo, buscar trabajos, contacto WhatsApp/email. Abrir PR contra `main` y esperar GitHub checks, Vercel Preview y Supabase Preview. No mergear a `main` mientras exista `BLOCKED_PRODUCTION_RISK`. Aplicar `supabase/migrations/20260516223000_harden_real_marketplace_flow.sql` solo a Supabase staging/canonical mediante credencial segura aprobada. Luego ejecutar `npm run staging:check`, `npm run test:rls:static`, `npm run rls:smoke` y browser smoke real `signup/login -> /role -> publicar trabajo -> worker apply -> client accept`. Actualizar docs/status con GO/NO-GO.
