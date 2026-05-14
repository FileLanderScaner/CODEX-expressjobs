# ExpressJobs GitHub Project Board Blueprint

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status Columns

- Inbox
- Triage
- Ready for Codex
- In Progress
- Needs Human Approval
- Review
- Blocked
- Done

## Fields

- Priority
- Risk
- Area
- Phase
- Human Approval Required
- Production Risk
- Payment Risk
- RLS Risk
- Preview Required
- Revenue Impact

## Suggested Automations

- New issue -> Inbox.
- `status-triage` -> Triage.
- `status-ready-for-codex` -> Ready for Codex.
- PR opened -> In Progress.
- PR ready for review -> Review.
- `status-needs-human` -> Needs Human Approval.
- `status-blocked` -> Blocked.
- PR merged -> Done.

## Human Gate

Do not create or enforce the Project board automatically without repository owner approval.
