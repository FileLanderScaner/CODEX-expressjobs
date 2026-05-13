# ExpressJobs First 10 Tester Dry Run Package

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`FIRST_10_TESTER_PACKAGE=READY_DRY_RUN_ONLY`

`FIRST_10_EXTERNAL_TESTERS_STATUS=NO-GO_UNTIL_PREVIEW_AND_RLS_PASS`

This package prepares the first controlled tester sessions for ExpressJobs / Trabajos Rapidos. It does not authorize outreach, public testing, production launch, live payments, or claims that staging is ready.

## Required Gate Before External Testers

Do not run this package with external testers until all items are true:

- Vercel Preview exists for branch `codex/expressjobs-autonomous-bootstrap`.
- Supabase staging project is configured and confirmed non-production.
- Migration `supabase/migrations/202605120001_expressjobs_mvp_schema.sql` is applied to staging.
- `npm run staging:check` passes.
- `npm run rls:smoke` returns `EXPRESSJOBS_RLS_STAGING_PASS`.
- Browser smoke passes on Preview.
- Release gate is updated from `NO-GO_PUBLIC_COHORT_UNTIL_PREVIEW_AND_RLS_PASS`.

## Tester Mix

- 3 potential clients in Montevideo or the initial local zone.
- 3 workers, changueros, or oficio providers.
- 2 small shops or neighborhood businesses.
- 2 general observer users.

Do not include minors. Do not include people who expect guaranteed income, guaranteed employment, or immediate real paid work from the session.

## Session Goals

- Confirm whether users understand the value proposition in under 5 seconds.
- Confirm whether users find the correct role path.
- Confirm whether a client can create a task.
- Confirm whether a worker can find and apply to a task.
- Confirm whether users understand that payments are not active.
- Confirm whether users understand there is no guaranteed employment or guaranteed income.
- Identify trust, safety, privacy, and clarity risks before expanding to 25 users.

## Metrics To Record

- `landing_viewed`
- `role_selected`
- `signup_started`
- `signup_completed`
- `job_created`
- `job_viewed`
- `job_application_created`
- `message_sent`
- `whatsapp_share_clicked`
- `feedback_submitted`

## Prepared Messages

These messages are prepared only. Do not send them until Preview and RLS gates pass.

### Client Tester Invitation

Hola, estamos preparando una prueba controlada de Trabajos Rapidos, una app para publicar tareas simples y recibir postulaciones de trabajadores locales. Esto es una prueba controlada, no una oferta laboral ni una promesa de ingresos. La sesion dura unos 20 minutos y buscamos feedback sobre claridad, confianza y facilidad de uso.

### Worker Tester Invitation

Hola, estamos preparando una prueba controlada de Trabajos Rapidos, una app para encontrar tareas locales simples. Esto es una prueba controlada, no una oferta laboral ni una promesa de ingresos. Queremos observar si el flujo para buscar trabajos y postularse se entiende.

### Small Shop Invitation

Hola, estamos validando Trabajos Rapidos con comercios chicos para entender si les serviria publicar tareas puntuales como cadeteria, limpieza, ayuda operativa o arreglos simples. Es una prueba controlada, sin pagos activos y sin promesas comerciales.

### Simple Consent Message

Antes de empezar: esta es una prueba controlada de un MVP. No hay pagos reales activos, no se garantiza empleo ni ingresos, y vamos a registrar observaciones anonimas sobre la experiencia para mejorar el producto.

### Follow-Up Message

Gracias por probar Trabajos Rapidos. Estamos revisando tus comentarios junto con los de otros testers para decidir si el producto esta claro y seguro antes de ampliar la prueba.

### Thank-You Message

Gracias por tu tiempo. Tu feedback ayuda a detectar problemas de claridad, confianza y seguridad antes de invitar a mas personas.

### Feedback Request

Cuando puedas, dejanos tres respuestas cortas: que entendiste que hace la app, que parte te genero duda, y que cambiarias antes de usarla con trabajos reales.

## Evidence Folder Policy

Keep evidence outside Git if it includes names, phone numbers, emails, screenshots with personal data, or raw session notes. Commit only anonymized summaries.
