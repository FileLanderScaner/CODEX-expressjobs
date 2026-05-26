# ExpressJobs Global Visual Audit

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Problema Inicial

El rediseño dark premium soft estaba aplicado de forma parcial. Habia rutas principales y componentes compartidos con fondos claros, formularios genericos, cards blancas, copy tecnico visible y un header que podia romper responsive.

## Rutas Revisadas

Revisadas en codigo y smoke local: `/`, `/auth`, `/como-funciona`, `/worker/jobs`, `/client/jobs/new`, `/jobs`, `/pricing`, `/ofertas`, `/register`, `/dashboard/client`, `/dashboard/worker`, `/dashboard/client/profile`, `/dashboard/worker/profile`, `/admin`, `/production-paused`, `/_not-found`.

## Rutas Corregidas

Corregidas directamente o por componentes compartidos: home, auth, como-funciona, worker jobs, publicar trabajo, jobs publicos, pricing, ofertas, register, dashboards cliente/trabajador, perfiles, admin, production paused, loading, error y not-found.

## Componentes Corregidos

`AppShell`, `PrimaryButton`, `SocialAuthButtons`, `AuthEmailForm`, `JobForm`, `JobCard`, `WorkerJobsClient`, `ClientDashboard`, `RoleSelector`, `TrustSafetyNotice`, `StatusFlow`, estados vacios/carga/error, formularios de perfil, cards de postulacion, chat, review y monetizacion.

## Decisiones Visuales

- Sistema global en `src/app/globals.css` con tokens `--ej-*`.
- Dark glass cards para marketplace, dashboards y formularios.
- CTA principal verde `#7bc143`, con hover `#8fd255`.
- Compatibilidad con variables legacy para evitar regresiones visuales.
- Header sticky oscuro, nav mobile horizontal y badge `NO-GO_PRODUCTION`.
- Footer oscuro con contacto, piloto controlado y pagos reales apagados.

## Google Login

`/auth` ahora muestra siempre `Continuar con Google`. Si Supabase o el provider externo no estan configurados, el boton permanece visible y muestra error amable sin secretos. La configuracion externa sigue dependiendo de Supabase Auth/Google OAuth.

## Auditoria de Clases Claras

`rg "bg-white|text-black|border-gray-200|border-gray-300|shadow-sm|bg-gray-50|bg-slate-50|text-gray-900" src/app src/components` ya no devuelve `bg-white` generico en rutas/componentes. Los matches residuales son overlays translucidos `bg-white/10` o reglas de compatibilidad en `globals.css`.

## Checks

- `npm run secret:scan`: PASS.
- `npm run production:check`: PASS.
- `npm run guard:no-production-deploy`: PASS.
- `npm run test:rls:static`: PASS.
- `npm run staging:check`: PASS.
- `npm run rls:smoke`: PASS, `EXPRESSJOBS_RLS_STAGING_PASS`.
- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm test`: PASS, 10 files / 59 tests.
- `npm run build`: PASS.
- `git diff --check`: PASS.

## Smoke Visual

Local `npm run dev` en `http://localhost:3000`.

- Desktop 1360px: rutas principales sin bloques blancos genericos, sin errores de consola y sin overflow horizontal.
- Tablet 768px: se detecto overflow por header desktop; corregido cambiando nav desktop a `lg`. Re-smoke PASS sin overflow.
- Mobile 390px: rutas principales PASS sin overflow, Google visible en `/auth`, `NO-GO_PRODUCTION` visible y sin errores de consola relevantes.

## Seguridad

No se uso `vercel --prod`, no se uso `vercel promote`, no se tocaron Vercel Production env vars, no se toco Supabase production, no se activo PayPal live, no se activaron pagos reales, no se imprimieron secrets y no se desactivo RLS.

## Bloqueos

No hay bloqueos para el siguiente ciclo seguro dentro del repo. Google OAuth puede requerir configuracion externa si el ambiente no tiene provider/flag listo.
