## Summary

Describe the change and why it is safe.

## Type of change

- [ ] Feature
- [ ] Bug fix
- [ ] Docs/status
- [ ] Security/Auth/RLS
- [ ] Payment sandbox
- [ ] Release gate
- [ ] GitHub governance

## Safety checklist

- [ ] No production deploy was performed.
- [ ] No `vercel --prod` was used.
- [ ] No `vercel promote` was used.
- [ ] No Production env vars were modified.
- [ ] No secrets were printed, logged, pasted, committed, or added to docs/issues.
- [ ] No `.env`, `.env.local`, `.env.rls`, `.vercel`, logs, zips, or credential files were committed.
- [ ] RLS was not disabled.
- [ ] RLS policies were not relaxed.
- [ ] PayPal live remains OFF.
- [ ] Real payments were not created.
- [ ] Real users were not contacted automatically.
- [ ] `PRODUCTION_STATUS=NO-GO_PRODUCTION` remains true unless there is explicit human approval.

## Required local/CI checks

- [ ] `npm run secret:scan`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run test:rls:static`
- [ ] `npm run build`
- [ ] `npm run production:check`
- [ ] `git diff --check`

## External checks, if applicable

- [ ] `npm run staging:check`
- [ ] `npm run rls:smoke`
- [ ] `npm run paypal:sandbox:smoke`
- [ ] Preview browser smoke

## Release decisions

- `FIRST_10_TESTERS=`
- `FIRST_25_TESTERS=`
- `PAID_PILOT=`
- `PRODUCTION=`

## Linked issues

Closes / Blocks / Relates to:
