# ExpressJobs Pilot CRM Workflow

`REAL_USER_CONTACT_BY_CODEX=OFF`

## Pipeline

| Stage | Owner | Exit evidence |
| --- | --- | --- |
| Lead captured | Human | Sanitized alias and segment |
| Qualified | Human | Need, role, budget range, urgency |
| Offer sent | Human | Offer label and date |
| Manual payment pending | Human | Generic payment method label only |
| Delivered | Human + operator | Listing/profile/highlight delivered |
| Feedback received | Human | Sanitized product feedback |
| Codex improvement queued | Codex | Issue/doc/task without PII |

## Minimal Sheet Columns

```text
internal_id
lead_alias
segment
offer
stage
quoted_amount_uyu
manual_payment_status
delivery_status
feedback_summary_sanitized
next_human_action
risk_note
```

## Do Not Store

- Real names unless already public business names and explicitly approved.
- Private phone numbers.
- Email addresses.
- Payment links.
- Receipts.
- Identity documents.
- Screenshots with personal data.

## Codex Handoff

When a human has sanitized evidence, Codex can receive:

```text
Offer:
Segment:
Objection:
Conversion result:
UX blocker:
Copy issue:
Requested change:
No secrets/PII included: yes
```

Current status: `CRM_WORKFLOW=READY_FOR_MANUAL_OPERATOR`.
