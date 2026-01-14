# 🚨 Deployment 500 Error - Quick Fix Guide

## Problem: 500 Internal Server Error on Vercel/Production

This happens when the app tries to access Supabase/Stripe but environment variables aren't configured.

## ✅ IMMEDIATE SOLUTION

### Step 1: Check Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables

**Verify these are ALL set:**

```env
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe (REQUIRED)
STRIPE_SECRET_KEY=sk_test_51... (or sk_live_51... for production)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51... (or pk_live_51...)

# App URL (REQUIRED)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Step 2: Redeploy After Adding Env Vars

After adding environment variables:
1. Go to Vercel → Deployments
2. Find latest deployment
3. Click ⋯ (three dots)
4. Click "Redeploy"
5. Check "Use existing Build Cache" (optional)
6. Click "Redeploy"

## 🔍 Check Deployment Logs

1. Go to Vercel Dashboard
2. Click on your deployment
3. Click "View Function Logs"
4. Look for specific errors

Common errors you'll see:
- `SUPABASE_URL is not defined`
- `STRIPE_SECRET_KEY is not defined`
- `Cannot connect to database`

## 🛠️ Additional Fixes

### If favicon.ico 404 error:
This is harmless, but to fix:

1. Add a favicon to `/public/favicon.ico`
2. Or remove favicon references

### If Chrome Extension errors:
These are browser extension messages - ignore them. They don't affect your app.

### If "Message port closed" error:
This is a browser/extension error - not your app. Safe to ignore.

## 📋 Full Environment Variables Checklist

Copy your `.env.local` values to Vercel:

### From Supabase Dashboard (https://app.supabase.com)
1. Go to your project
2. Click Settings → API
3. Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
4. Copy **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### From Stripe Dashboard (https://dashboard.stripe.com)
1. Go to Developers → API Keys
2. Copy **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copy **Secret key** → `STRIPE_SECRET_KEY`

### App URL
- Development: `http://localhost:3000`
- Production: `https://your-app.vercel.app`

## 🚀 Quick Test After Deployment

Visit these URLs to verify:
1. `https://your-app.vercel.app` - Home page should load
2. `https://your-app.vercel.app/marketplace` - Marketplace should load
3. `https://your-app.vercel.app/login` - Login page should load

If ANY of these show 500 error, environment variables are missing.

## 🔥 Emergency Rollback

If deployment keeps failing:
1. Go to Vercel → Deployments
2. Find a working deployment
3. Click ⋯ → "Promote to Production"

## 💡 Pro Tips

1. **Set Environment Variables BEFORE first deployment**
2. **Use Production scope** for env vars (not just Preview)
3. **Redeploy after adding env vars** - they don't auto-apply
4. **Check Function Logs** for specific error messages
5. **Test locally first** with `npm run build && npm start`

## 📞 Still Getting 500 Error?

Check these in order:

1. ✅ All env vars set in Vercel? (double-check spelling)
2. ✅ Redeployed after adding env vars?
3. ✅ Using correct Supabase project URL?
4. ✅ Using correct Stripe keys (test vs live)?
5. ✅ Supabase project is active (not paused)?
6. ✅ Function logs show specific error?

## 🎯 Most Common Fix

**Missing NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY**

These MUST be set in Vercel environment variables. The app crashes immediately without them.

---

## Quick Command Reference

### Test Build Locally
```bash
npm run build
npm start
# Visit http://localhost:3000
```

### Check for Missing Env Vars
```bash
# See what's in your .env.local
cat .env.local

# Make sure these are in Vercel too!
```

### View Vercel Logs
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# View logs
vercel logs your-deployment-url
```

---

**Need the actual values?** Check your `.env.local` file and copy them to Vercel! 🚀
