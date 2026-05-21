# ExpressJobs API Real Smoke

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Environment

- Local dev server on `localhost` only.
- Supabase configured: true.
- No secrets printed.

## Results

- `GET /api/health`: PASS, returned safe status only.
- `GET /api/profile` as anonymous: PASS, returned 401.
- `POST /api/contact` with invalid payload: PASS, returned 400.
- `POST /api/jobs` with invalid payload: PASS, returned 400.
- `GET /api/jobs`: PARTIAL, returned sanitized `JOBS_READ_FAILED` from Supabase/Data API.
- `POST /api/jobs` authenticated client flow: BLOCKED, no browser/session cookie smoke completed in this cycle.
- Applications/messages authenticated API flows: BLOCKED, require confirmed test sessions and Preview/local cookie flow.

## Status

`API_SMOKE=PARTIAL`

The API does not expose secrets or stack traces. Real data-path success remains pending Supabase Data API/session QA.

## Preview

Preview API smoke over public URL is blocked by Vercel Deployment Protection (`401`). Use Vercel authenticated access or a safe bypass token in a future QA cycle without printing the token.
