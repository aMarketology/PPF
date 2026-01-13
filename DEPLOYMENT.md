# Deployment Guide - Vercel

## Environment Variables Required

For successful deployment, configure these environment variables in your Vercel project settings:

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Stripe
```
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key (use sk_test_ for testing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key (use pk_test_ for testing)
```

### Application
```
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Build Configuration

The project is configured to handle missing environment variables during build:

1. **API Routes are Dynamic**: All Stripe API routes use `export const dynamic = 'force-dynamic'` to prevent build-time execution
2. **Lazy Loading**: Stripe SDK is initialized only when routes are called, not at build time
3. **Conditional Initialization**: Environment variables are checked at runtime, not build time

## Deployment Steps

### Option 1: Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Add environment variables from the list above
   - Deploy

3. **Configure Stripe Webhooks** (after deployment):
   - Go to Stripe Dashboard > Developers > Webhooks
   - Add endpoint: `https://your-domain.com/api/stripe/webhooks`
   - Select events to listen for:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.refunded`

### Option 2: Manual Build

1. **Set Environment Variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

2. **Build the Project**:
   ```bash
   npm run build
   ```

3. **Start Production Server**:
   ```bash
   npm run start
   ```

## Common Build Errors & Solutions

### Error: "STRIPE_SECRET_KEY is not defined"
**Solution**: This error should no longer occur with the lazy-loading implementation. If it does:
- Ensure all API routes have `export const dynamic = 'force-dynamic'`
- Check that Stripe is imported inside functions, not at module level

### Error: "Cannot find module '@/lib/supabase/server'"
**Solution**: This is a TypeScript path alias issue
- Ensure `tsconfig.json` has paths configured correctly
- Run `npm run build` again

### Warning: "A Node.js API is used (process.versions)"
**Solution**: This is a known warning from Supabase Realtime in Edge Runtime
- Safe to ignore - middleware doesn't use realtime features
- Or add to middleware: `export const runtime = 'nodejs'`

## Post-Deployment Checklist

- [ ] All environment variables are set in Vercel
- [ ] Supabase project is in production mode (not paused)
- [ ] Stripe webhooks are configured with production URL
- [ ] Domain is configured and SSL is active
- [ ] Test complete checkout flow
- [ ] Test order status updates
- [ ] Test email notifications (if configured)
- [ ] Check Supabase RLS policies are active
- [ ] Verify Stripe Connect accounts can onboard
- [ ] Test payment processing with Stripe test cards

## Monitoring

After deployment, monitor:
- Vercel deployment logs
- Supabase logs (Database, Auth)
- Stripe dashboard (payments, disputes, payouts)
- Application errors in Vercel Analytics

## Rollback

If issues occur:
1. Go to Vercel dashboard
2. Find previous working deployment
3. Click "Promote to Production"

## Support

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Stripe Docs: https://stripe.com/docs
- Next.js Docs: https://nextjs.org/docs
