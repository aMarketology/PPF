# ⚡ Quick Fix: 500 Error on Vercel

## The Problem
Your app works locally but shows "500 Internal Server Error" on Vercel.

## The Cause
Environment variables from `.env.local` aren't in Vercel.

## The Fix (2 minutes)

### 1. Copy Your Variables
Open `.env.local` and copy these 5 values:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### 2. Add to Vercel
1. Go to https://vercel.com → Your Project
2. Settings → Environment Variables
3. Paste each variable (name + value)
4. Check all 3 environment boxes
5. Click Save for each

### 3. Add App URL
- Name: `NEXT_PUBLIC_APP_URL`
- Value: Your Vercel URL (e.g., `https://ppf-precision.vercel.app`)

### 4. Redeploy
1. Deployments tab
2. Latest deployment → ⋯ → Redeploy
3. Wait 2-3 minutes

### 5. Test
Visit your site - should work now! ✅

## Still Broken?

Check: Vercel → Deployments → Function Logs

Common fixes:
- Redeploy (env vars don't auto-apply)
- Check spelling (copy-paste, don't type)
- Remove extra spaces in values
- Verify Supabase project is active

## ⚠️ Note on Stripe Keys

You're using **LIVE** keys (`sk_live_` / `pk_live_`). 

For testing, use **TEST** keys instead:
- Get from https://dashboard.stripe.com/test/apikeys
- Start with `sk_test_` and `pk_test_`
- Switch to live when ready for real payments

---

**Quick Check Command:**
```bash
./scripts/check-env.sh
```

This shows what variables you have locally.

**See detailed guide:** `FIX-500-ERROR-NOW.md`
