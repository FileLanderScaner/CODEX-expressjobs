# ExpressJobs Tester Feedback Tracker

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_TESTER_ONBOARDING_AND_FEEDBACK_TRACKER`

No real tester data belongs in this repository. Use tester codes instead of names, phones, emails, or personal identifiers.

## Tracker Columns

| Column | Purpose |
| --- | --- |
| `tester_code` | Anonymous code such as `EJ-T001`. |
| `segment` | Client, worker, commerce, student, entrepreneur. |
| `cohort` | 10, 25, 50, or 100. |
| `status` | invited, onboarded, tested, feedback_received, dropped. |
| `role_tested` | client, worker, admin_observer. |
| `flow_completed` | onboarding, job_created, application_created, accepted, message_sent, review_created. |
| `trust_score_1_5` | Tester trust rating. |
| `clarity_score_1_5` | Tester clarity rating. |
| `top_issue` | Main blocker or concern. |
| `severity` | critical, high, medium, low. |
| `follow_up_needed` | yes/no. |

## Example Rows

| tester_code | segment | cohort | status | role_tested | flow_completed | trust_score_1_5 | clarity_score_1_5 | top_issue | severity | follow_up_needed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EJ-T001 | client | 10 | invited | client | pending |  |  |  |  | yes |
| EJ-T002 | worker | 10 | invited | worker | pending |  |  |  |  | yes |

## Privacy Rule

Store real contact details outside the repository in an approved private system only. Do not commit spreadsheets, exports, screenshots, WhatsApp logs, or personal data.
