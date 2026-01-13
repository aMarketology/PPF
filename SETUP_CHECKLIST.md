# 🚀 Quick Setup Checklist

Follow these steps to get your marketplace up and running with Supabase.

## ✅ Step-by-Step Setup

### 1. Create Supabase Project
- [ ] Go to https://supabase.com/dashboard
- [ ] Click "New Project"
- [ ] Name: `precision-project-flow`
- [ ] Save your database password securely
- [ ] Wait 2 minutes for project creation

### 2. Run Database Setup
- [ ] In Supabase Dashboard → SQL Editor
- [ ] Click "New Query"
- [ ] Open `supabase/COMPLETE_SETUP.sql`
- [ ] Copy entire file contents
- [ ] Paste into SQL Editor
- [ ] Click **Run** button
- [ ] Verify "Success. No rows returned" message

### 3. Configure Environment Variables
- [ ] Copy `.env.template` to `.env.local`
- [ ] In Supabase Dashboard → Settings → API
- [ ] Copy **Project URL** to `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Copy **anon public** key to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Copy **service_role** key to `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Save `.env.local`

### 4. Get Stripe Keys (for payments)
- [ ] Go to https://dashboard.stripe.com/test/apikeys
- [ ] Copy **Publishable key** to `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] Copy **Secret key** to `STRIPE_SECRET_KEY`
- [ ] Save `.env.local`

### 5. Test Database Connection
```bash
node scripts/test-database.js
```
- [ ] All tables show ✅
- [ ] No errors appear

### 6. Seed Test Data
```bash
node scripts/seed-test-data.js
```
- [ ] 5 companies created
- [ ] 15 products created

### 7. Start Development Server
```bash
npm run dev
```
- [ ] Server starts on http://localhost:3000
- [ ] No console errors

### 8. Test User Flows

**A. Signup as Customer:**
- [ ] Go to http://localhost:3000/signup
- [ ] Create account with email/password
- [ ] Confirm you're redirected to home
- [ ] Check Supabase Dashboard → Authentication → Users

**B. Browse Products:**
- [ ] Go to http://localhost:3000/marketplace/products
- [ ] See 15 test products
- [ ] Click on a product
- [ ] See product details page

**C. Create Company Profile:**
- [ ] Go to http://localhost:3000/profile
- [ ] Click "Create Company Profile"
- [ ] Fill in company details
- [ ] Save company profile
- [ ] Verify in Supabase Dashboard → Table Editor → company_profiles

**D. Post a Product:**
- [ ] Go to http://localhost:3000/products/create
- [ ] Fill in product details (name, price, category, etc.)
- [ ] Upload image (optional)
- [ ] Click "Create Product"
- [ ] Verify product appears in marketplace

**E. Purchase Flow (Test Mode):**
- [ ] Browse to a product
- [ ] Click "Buy Now"
- [ ] Go through checkout
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Expiry: Any future date
- [ ] CVC: Any 3 digits
- [ ] Complete payment
- [ ] See success page
- [ ] Check order in http://localhost:3000/orders

### 9. Verify Database
- [ ] Supabase Dashboard → Table Editor
- [ ] Check `profiles` - see your user
- [ ] Check `company_profiles` - see your company
- [ ] Check `products` - see test + your products
- [ ] Check `product_orders` - see test orders

## 🎯 Success Criteria

All of these should work:
- ✅ Users can sign up and log in
- ✅ Users can create company profiles
- ✅ Companies can post products with prices
- ✅ Public can browse products
- ✅ Users can purchase products (test mode)
- ✅ Orders appear in customer order history
- ✅ All data stored in Supabase

## 🐛 Common Issues

### "relation does not exist"
**Fix:** Run `COMPLETE_SETUP.sql` in Supabase SQL Editor

### "permission denied for table"
**Fix:** Check RLS policies are enabled. Re-run COMPLETE_SETUP.sql

### "Missing environment variables"
**Fix:** Copy `.env.template` to `.env.local` and fill in all values

### Test data script fails
**Fix:** Make sure COMPLETE_SETUP.sql ran successfully first

### Can't create products
**Fix:** 
1. Create a company profile first
2. Check you're logged in
3. Verify company_profiles table has your company

### Payment fails
**Fix:**
1. Use test card: 4242 4242 4242 4242
2. Check Stripe keys in .env.local
3. Verify you're using test mode keys (pk_test_ and sk_test_)

## 📚 Documentation

- **Database Setup:** `SUPABASE_SETUP_GUIDE.md`
- **Testing Guide:** `CUSTOMER_PURCHASE_TESTING.md`
- **Phase 1 Complete:** Product CRUD system
- **Phase 2 Complete:** Checkout with Stripe
- **Phase 3:** Order management (in progress)

## 🆘 Need Help?

1. Check Supabase Dashboard → Logs for errors
2. Check browser console for client errors
3. Review `SUPABASE_SETUP_GUIDE.md` for detailed instructions
4. Verify all environment variables are set correctly

## 🎉 All Done?

If all checkboxes are ✅, you're ready to develop!

Next steps:
- Customize product categories
- Add more test data
- Configure email templates
- Set up Stripe Connect for payouts
- Deploy to production
