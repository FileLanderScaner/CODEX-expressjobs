# ExpressJobs Director Report

## Modo ejecutado
`EXPRESSJOBS_PREVIEW_SMOKE_ROUTE_COVERAGE_NO_DB_CHANGES`

## Objetivo
Ampliar la cobertura del smoke test de Vercel Preview para incluir rutas públicas nuevas y críticas, sin tocar Supabase, sin migraciones y sin producción.

## Cambios
- `scripts/smoke-preview.mjs` ahora cubre:
  - `/`
  - `/como-funciona`
  - `/jobs`
  - `/jobs/open`
  - `/register`
  - `/auth`
  - `/role`
  - `/pricing`
  - `/production-paused`
- El smoke reporta `PREVIEW_SMOKE_RESULTS` con status por ruta.
- El smoke sigue bloqueando hosts de producción y solo acepta hosts `.vercel.app`.
- El smoke sigue fallando ante errores 5xx.
- 401 de Vercel Deployment Protection y redirects no se consideran falla, porque Preview puede estar protegido.

## Seguridad
- No Supabase migrations.
- No Supabase branch creation.
- No Supabase branch reset/delete.
- No Vercel production deploy.
- No `vercel --prod`.
- No `vercel promote`.
- No Production env mutation.
- No PayPal live.
- No real payments.
- No secrets.

## Estado de producción
`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Próximo modo recomendado
`EXPRESSJOBS_WEBAPP_PUBLIC_ROUTES_QA_NO_DB_CHANGES`