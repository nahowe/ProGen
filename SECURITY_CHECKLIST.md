# Security Checklist for SAAS Website Builder

## Before Committing Code
- [ ] Never commit `.env.local` or any `.env` files with real values
- [ ] All sensitive values are in environment variables
- [ ] No API keys in code
- [ ] No hardcoded passwords
- [ ] No database credentials in code

## Production Deployment
- [ ] Use environment variables service (Vercel)
- [ ] Enable HTTPS everywhere
- [ ] Enable Row Level Security (RLS) in Supabase
- [ ] Use Stripe's hosted checkout
- [ ] Enable email verification

## Regular Maintenance
- [ ] Review access logs
- [ ] Update dependencies monthly
- [ ] Run `npm audit` regularly
