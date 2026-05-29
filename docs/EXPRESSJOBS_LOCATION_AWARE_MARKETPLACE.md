# ExpressJobs Location-Aware Marketplace

Status: `PREVIEW_ONLY`
Production: `NO-GO_PRODUCTION`

## Goal

Let workers prioritize nearby jobs while keeping exact addresses out of public listings.

## Added

- Worker jobs feed button: `Ver cerca de mi`.
- Browser location permission flow.
- Distance-ready job sorting when coordinates exist.
- Manual fallback through city and neighborhood search.
- Optional distance badge in job cards.
- Job publishing now separates city, neighborhood, and private address.
- Supabase migration adds location fields and indexes.

## Privacy model

- Public list: city, neighborhood, approximate distance.
- Worker before acceptance: no exact address.
- Accepted worker/client/admin: coordinate through protected flows.
- No real-time tracking in this phase.

## Manual QA checklist

1. Open `/worker/jobs` in Vercel Preview.
2. Test search by title, description, city, neighborhood, and budget.
3. Test `Solo con presupuesto`.
4. Click `Ver cerca de mi` and accept location permission.
5. Confirm success message appears.
6. Confirm jobs with coordinates rank before jobs without coordinates.
7. Deny location permission and confirm fallback message appears.
8. Open `/client/jobs/new`.
9. Confirm city is required.
10. Confirm neighborhood is optional.
11. Confirm private address is optional and labeled private.
12. Publish a Preview-only test job.
13. Confirm public listings do not expose private address.

## Safety constraints

- No production deploy.
- No production promote.
- No production env mutation.
- No PayPal live.
- No AI Gateway activation.
- No service-role key in client code.
- No live tracking.

## Next safe increment

- Private address only after acceptance.
- Worker preferred zone and service radius enrichment.
- Server-side distance RPC for larger datasets.
- City and neighborhood autocomplete.
