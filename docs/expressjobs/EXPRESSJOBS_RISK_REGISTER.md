# ExpressJobs Risk Register

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

| Risk | Severity | Mitigation |
| --- | --- | --- |
| RLS mistake exposes private jobs/messages | High | Staging user tests before deploy |
| Informal labor/payment disputes | High | Manual pilot, clear status trail, no live payments |
| Fraud or spam jobs | Medium | Admin audit logs and protected admin workflow later |
| WhatsApp sharing leaks sensitive details | Medium | Share only public job summary by default |
| AhorroYA artifacts contaminate product | Medium | Clean repo, reuse plan, no wholesale copy |
| Missing production observability | High | Production remains NO-GO |
