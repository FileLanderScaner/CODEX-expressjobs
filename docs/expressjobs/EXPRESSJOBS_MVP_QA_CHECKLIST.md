# ExpressJobs MVP QA Checklist

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Automated Checks

- `npm run secret:scan`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `git diff --check`

## Manual Flow Checks

- Landing copy says: "Publica trabajos rapidos o encontra tareas cerca tuyo."
- Client CTA says: "Publicar un trabajo."
- Worker CTA says: "Buscar trabajos cerca."
- `/client/jobs/new` renders the job form.
- `/client/jobs/[id]` renders applications, status controls, chat, and review form.
- `/worker/jobs` renders open and accepted jobs.
- `/worker/jobs/[id]` renders apply CTA, chat, and safety notice.
- `/admin` renders read-only overview.
- `/pricing` says real payments are not active.
- `/terms` does not promise guaranteed employment or guaranteed income.

## Supabase QA Pending

- Apply migration only in staging.
- Create client, worker, and admin users.
- Validate RLS by role.
- Validate messages are participant-only.
- Validate reviews require completed jobs.
- Validate admin audit visibility.
