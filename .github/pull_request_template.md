# Summary

## Type of change

- [ ] Feature
- [ ] Bug fix
- [ ] Docs/status
- [ ] Security/Auth/RLS
- [ ] Payment sandbox
- [ ] Release gate

## Risks

- Production risk: `no / yes`
- Payment live risk: `no / yes`
- Secret risk: `no / yes`
- RLS/Auth risk: `no / yes`
- User contact risk: `no / yes`

## Evidence

- [ ] `npm run secret:scan`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run build`
- [ ] `npm run production:check`
- [ ] `npm run staging:check` if env is available
- [ ] `npm run test:rls:static` if relevant
- [ ] `npm run rls:smoke` if env is available and relevant

## Preview / screenshots

Add protected Preview URL or screenshots if UI changed. Do not include bypass secrets.

## Required confirmations

- [ ] Production remains `NO-GO_PRODUCTION`.
- [ ] No production deploy command was used.
- [ ] No production promotion command was used.
- [ ] No Vercel Production env was modified.
- [ ] PayPal live remains off.
- [ ] No real payment was created.
- [ ] No secrets, tokens, cookies, auth codes, service role keys, or personal data were committed.
- [ ] RLS was not relaxed or disabled.
- [ ] No real users were contacted automatically.
