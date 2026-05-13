# ExpressJobs Tracking Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Behavior

Tracking must never block the app. The current implementation writes to local storage with session storage fallback. Supabase event persistence can be added after staging credentials exist.

## Events

- `app_opened`
- `landing_viewed`
- `signup_started`
- `signup_completed`
- `role_selected`
- `job_created`
- `job_viewed`
- `job_application_created`
- `job_application_accepted`
- `job_started`
- `job_completed`
- `review_created`
- `message_sent`
- `whatsapp_share_clicked`
- `premium_cta_clicked`
- `commission_info_viewed`
- `pricing_viewed`

## AI Studio Reference Update

The AI Studio prototype used console logging for arbitrary event properties. ExpressJobs keeps typed event names, local/session storage fallback, and basic payload sanitization to avoid storing obvious email, phone, or password fields.

## Future Supabase Persistence

Persist non-sensitive events to `ej_job_events` when the event is job-specific. For app-level events, either allow `job_id = null` or create a dedicated `ej_app_events` table in a later migration.
