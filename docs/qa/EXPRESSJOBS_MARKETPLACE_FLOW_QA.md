# ExpressJobs Marketplace Flow QA

## Client Flow

1. Create or log in with a staging account.
2. Select client role.
3. Publish a job.
4. Confirm it appears in client dashboard.
5. Review applications.
6. Accept or reject one application.
7. Confirm resolved applications cannot be processed again.

## Worker Flow

1. Create or log in with a staging account.
2. Select worker role.
3. Open `/worker/jobs`.
4. Apply to an open job not owned by the worker.
5. Confirm duplicate apply is blocked.
6. Confirm accepted jobs and messages are visible only when authorized.

## Data Safety

Use synthetic accounts only. Do not capture emails, tokens, cookies, JWTs or private message payloads in screenshots or reports.
