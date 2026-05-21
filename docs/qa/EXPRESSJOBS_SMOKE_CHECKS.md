# ExpressJobs Smoke Checks

## Public Routes

- `/`
- `/ofertas`
- `/landing-negocios`
- `/sponsor`
- `/pricing`
- `/precios`
- `/como-funciona`
- `/seguridad`
- `/contacto`
- `/contact`
- `/auth`
- `/login`
- `/signup`
- `/demo/peluqueria`
- `/demo/estetica`
- `/demo/tecnico-reparaciones`
- `/demo/limpieza`
- `/demo/delivery`
- `/legal/privacy`
- `/legal/terms`

## Private Routes

- `/dashboard`
- `/dashboard/client`
- `/dashboard/worker`
- `/dashboard/profile`
- `/dashboard/jobs`
- `/dashboard/applications`
- `/dashboard/messages`
- `/dashboard/settings`
- `/admin`

Anonymous users must not receive private data from private routes.

## APIs

- `/api/health`
- `/api/contact`
- `/api/jobs`
- `/api/applications`
- `/api/messages`
- `/api/profile`

## Production

`/production-paused` must remain available and production must remain `NO-GO_PRODUCTION`.
