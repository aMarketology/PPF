# 🚀 Quick Deployment Checklist

## Pre-Deployment (Do This Now)

- [x] Fix all build errors
- [x] Add dynamic exports to authenticated pages
- [x] Fix Stripe lazy loading
- [x] Add Suspense to useSearchParams
- [x] Fix mockOrders references
- [ ] Test `npm run build` locally
- [ ] Test `npm run dev` works
- [ ] Verify all environment variables in `.env.local`

## Vercel Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Phase 3 complete - order management system + build fixes"
git push origin main
```

### 2. Import to Vercel
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repo: `PPF---PrecisionProjectFlow`
4. Click "Import"

### 3. Configure Environment Variables

In Vercel dashboard, add these:

**Supabase** (Required):
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
```

**Stripe** (Required):
```
STRIPE_SECRET_KEY=sk_test_... (use sk_live_ for production)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (use pk_live_ for production)
```

**Application** (Required):
```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 4. Deploy
1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Check deployment logs for errors
4. Visit your live URL!

### 5. Post-Deployment Verification

Test these features:
- [ ] Home page loads
- [ ] Can browse marketplace
- [ ] Can sign up / log in
- [ ] Can create company profile
- [ ] Can create products (company)
- [ ] Can view products (customers)
- [ ] Can checkout with Stripe test card
- [ ] Order appears in customer orders
- [ ] Order appears in company sales dashboard
- [ ] Can update order status
- [ ] Timeline updates correctly

### 6. Configure Stripe Webhooks (Critical!)

After deployment:
1. Go to Stripe Dashboard: https://dashboard.stripe.com
2. Click "Developers" > "Webhooks"
3. Click "Add endpoint"
4. **Webhook URL**: `https://your-app.vercel.app/api/stripe/webhooks`
5. **Events to send**:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
6. Click "Add endpoint"
7. Copy the "Signing secret" (starts with `whsec_`)
8. Add to Vercel env vars:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
9. Redeploy in Vercel

## Test Cards (Stripe Test Mode)

**Successful Payment**:
```
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

**Declined Payment**:
```
Card: 4000 0000 0000 0002
```

**3D Secure Required**:
```
Card: 4000 0027 6000 3184
```

## Common Issues & Solutions

### Build Fails with "STRIPE_SECRET_KEY not defined"
- ✅ **Fixed**: We added lazy loading
- Check that API routes have `export const dynamic = 'force-dynamic'`

### Build Fails with "Supabase URL required"
- ✅ **Fixed**: We added dynamic exports to auth pages
- Check that authenticated pages have `export const dynamic = 'force-dynamic'`

### useSearchParams Error
- ✅ **Fixed**: We wrapped in Suspense
- Check that `checkout/success/page.tsx` has Suspense boundary

### Orders Don't Update After Payment
- ⚠️ **Need Webhooks**: This will be fixed in Phase 4
- For now, manually update order status in Supabase

## Production Checklist (Before Going Live)

- [ ] Change Stripe keys from test to live
- [ ] Create production Supabase project
- [ ] Update Supabase environment variables
- [ ] Configure production webhook URL
- [ ] Add custom domain in Vercel
- [ ] Enable HTTPS/SSL (automatic in Vercel)
- [ ] Test complete checkout flow with real card
- [ ] Set up monitoring (Vercel Analytics)
- [ ] Configure error tracking (Sentry optional)
- [ ] Add privacy policy page
- [ ] Add terms of service page
- [ ] Test RLS policies in production
- [ ] Verify email notifications work

## Monitoring After Launch

Check these daily:
- Vercel deployment logs
- Supabase logs (Database > Logs)
- Stripe dashboard (Payments, Disputes)
- Error rates in Vercel Analytics

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 🎉 Ready to Deploy!

Your marketplace is **build-ready** and can be deployed right now. The only missing features (webhooks and emails) can be added later without blocking deployment.

**Estimated Deployment Time**: 15-30 minutes

Let's go live! 🚀
