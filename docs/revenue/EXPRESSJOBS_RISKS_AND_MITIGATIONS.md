# ExpressJobs Revenue Risks And Mitigations

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

| Risk | Mitigation |
| --- | --- |
| Customer expects production platform | State clearly this is a manual pilot. |
| Payment data leaks into repo | Never store bank data, private links, screenshots, or IDs. |
| In-app payment confusion | Keep all payment language manual and outside app. |
| Spam/report risk | Human posts manually and follows platform rules. |
| Overpromising results | Sell deliverables, not guaranteed sales. |
| RLS blocker misunderstood | Keep public expansion blocked until hardening apply + smoke pass. |
| PayPal live accidentally enabled | Keep live off and use feature flags. |
