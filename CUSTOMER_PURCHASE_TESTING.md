# 🛒 Customer Purchase Flow - Testing Guide

## Overview
Complete end-to-end testing guide for customers purchasing products using Stripe's test mode.

---

## 🎯 Test Flow Summary

1. **Browse Marketplace** → View all available products
2. **View Product Details** → Click on any product to see full details
3. **Login as Customer** → Must be logged in to purchase
4. **Initiate Checkout** → Click "Buy Now" button
5. **Enter Payment Details** → Use Stripe test cards
6. **Complete Purchase** → Process payment through Stripe
7. **View Success Page** → See order confirmation
8. **Check Order** → Verify order was created

---

## 📋 Step-by-Step Testing Instructions

### Step 1: Browse the Marketplace
1. Open http://localhost:3000/marketplace/products
2. ✅ You should see 15 products from 5 companies
3. Products display:
   - Product name and description
   - Company name and location
   - Price and "Buy Now" button
   - Product image
   - Category badge

### Step 2: View Product Details Page
1. Click on any product card (e.g., "HVAC System Design Package")
2. ✅ Should navigate to `/marketplace/product/[id]`
3. Product details page should show:
   - Large product image
   - Full product description
   - Price prominently displayed
   - Company information card with:
     * Company logo/icon
     * Company description
     * Location
     * Website, email, phone (if available)
     * Company specialties
   - "What's Included" section
   - Large "Buy Now" button at bottom
   - "Secure payment powered by Stripe" badge

### Step 3: Create Customer Account (If Needed)
1. If not logged in, click "Buy Now"
2. ✅ Should redirect to `/login` with return URL
3. **Option A: Create New Customer Account**
   - Go to `/signup`
   - Create account with:
     * Email: `customer1@test.com`
     * Password: `TestPass123!`
   - ✅ Account created successfully

4. **Option B: Use Existing Test Account**
   - Login with any test company email (they can also buy products)

### Step 4: Initiate Checkout
1. While logged in, click "Buy Now" on product details page
2. ✅ Should navigate to `/checkout/[product-id]`
3. Checkout page should show:
   - **Left Side:** Order Summary
     * Product image and name
     * Company name
     * Category badge
     * Price breakdown (Subtotal, Processing Fee, Total)
     * Security badge
   - **Right Side:** Payment Details Form
     * Stripe Payment Element
     * Test card information banner
     * "Pay $X,XXX.XX" button

### Step 5: Enter Payment Information

#### 🧪 Stripe Test Cards to Use:

**✅ Successful Payment:**
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

**❌ Card Declined:**
```
Card Number: 4000 0000 0000 0002
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

**🔒 3D Secure Authentication:**
```
Card Number: 4000 0025 0000 3155
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
(Will prompt for additional authentication)
```

**💰 Insufficient Funds:**
```
Card Number: 4000 0000 0000 9995
```

### Step 6: Complete Payment
1. Fill in the Stripe Payment Element with test card
2. Enter billing details (name, email)
3. Click "Pay $X,XXX.XX" button
4. ✅ Button shows "Processing Payment..." with spinner
5. Wait for payment to process (2-3 seconds)

**Expected Results:**
- ✅ Success toast notification appears
- ✅ Redirected to `/checkout/success?payment_intent=pi_xxx&product_id=xxx`

### Step 7: View Success Page
1. Success page should display:
   - ✅ Large green checkmark icon with animation
   - ✅ "Payment Successful! 🎉" heading
   - ✅ Order details card showing:
     * Product image and name
     * Company name
     * Total amount paid
     * Order ID
     * Payment status (should be "succeeded")
     * Payment method
     * Date of purchase
   - ✅ "What Happens Next?" section with 4 checkpoints
   - ✅ Two action buttons:
     * "View My Orders" (primary blue)
     * "Continue Shopping" (secondary gray)
   - ✅ Company contact email displayed

---

## 🔍 Detailed Verification Checks

### Database Verification
After successful payment, verify data was created:

1. **Check `payment_intents` table:**
```sql
SELECT * FROM payment_intents 
ORDER BY created_at DESC 
LIMIT 1;
```
Should show:
- `stripe_payment_intent_id` (e.g., pi_xxx)
- `customer_id` (your user ID)
- `product_id`
- `company_id`
- `amount` (product price)
- `currency` (usd)
- `platform_fee` (10% of amount)
- `status` = 'succeeded'

2. **Check Stripe Dashboard:**
   - Go to https://dashboard.stripe.com/test/payments
   - ✅ Payment should appear with:
     * Amount charged
     * Platform fee (10%)
     * Connected account receiving payment
     * Status: Succeeded

### Security Checks

**Test 1: Unauthenticated User**
1. Logout completely
2. Try to access `/checkout/[product-id]` directly
3. ✅ Should redirect to `/login` page

**Test 2: Invalid Product**
1. Try to access `/checkout/fake-product-id-123`
2. ✅ Should show error and redirect back to marketplace

**Test 3: Inactive Product**
1. As a company, toggle one of your products to inactive
2. As a customer, try to buy that inactive product
3. ✅ Should show "Product not found" error

---

## 🎨 UI/UX Quality Checks

### Checkout Page Design
- ✅ Dark theme with blue/purple gradients
- ✅ Two-column layout (order summary left, payment right)
- ✅ Sticky order summary on desktop
- ✅ Responsive: stacks on mobile
- ✅ Payment Element matches dark theme
- ✅ Clear security badges and messaging
- ✅ Test card info banner clearly visible

### Payment Element Appearance
- ✅ Dark background (#1e293b)
- ✅ Blue primary color (#3b82f6)
- ✅ Light text (#f1f5f9)
- ✅ Rounded corners (8px)
- ✅ Smooth animations on focus

### Success Page Animation
- ✅ Smooth fade-in on page load
- ✅ Success icon scales in with spring animation
- ✅ Cards animate in sequence with stagger
- ✅ Professional and celebratory feel

---

## 🧪 Test Scenarios

### Scenario 1: Happy Path Purchase
1. Browse marketplace
2. Click on "Commercial Electrical System Design" ($6,000)
3. Login as customer
4. Click "Buy Now"
5. Enter card: 4242 4242 4242 4242
6. Complete payment
7. ✅ See success page
8. ✅ Order created in database
9. ✅ Payment visible in Stripe dashboard

### Scenario 2: Declined Card
1. Go to any product checkout
2. Enter card: 4000 0000 0000 0002 (decline card)
3. Click "Pay Now"
4. ✅ Should show error: "Your card was declined"
5. ✅ User stays on checkout page
6. ✅ Can retry with different card

### Scenario 3: 3D Secure Authentication
1. Go to any product checkout
2. Enter card: 4000 0025 0000 3155
3. Click "Pay Now"
4. ✅ Stripe modal appears for authentication
5. Click "Complete authentication"
6. ✅ Payment succeeds
7. ✅ Redirected to success page

### Scenario 4: Multiple Purchases
1. Complete one successful purchase
2. Go back to marketplace
3. Purchase a different product from different company
4. ✅ Both payments should succeed
5. ✅ Two separate payment_intents in database
6. ✅ Both payments in Stripe dashboard

### Scenario 5: Company Buys from Another Company
1. Login as StructureTech (company account)
2. Browse marketplace
3. Click on MechaniX's "HVAC System Design Package"
4. Complete purchase with test card
5. ✅ Should work (companies can be customers too)
6. ✅ Payment processed correctly

---

## 💰 Platform Fee Verification

### How It Works:
- **Total charged to customer:** Product price (e.g., $5,000)
- **Platform fee (10%):** $500
- **Company receives:** $4,500

### Verify in Code:
Check `/app/api/stripe/create-payment-intent/route.ts`:
```typescript
const platformFeePercent = 0.10;
const totalAmount = Math.round(product.price * 100); // $5,000 = 500000 cents
const platformFee = Math.round(totalAmount * platformFeePercent); // $500 = 50000 cents
```

### Verify in Stripe:
1. Go to Stripe Dashboard → Payments
2. Click on the payment
3. Check "Application fee" section
4. ✅ Should show 10% of total amount

---

## 🐛 Common Issues & Solutions

### Issue 1: "Failed to initialize checkout"
**Cause:** Product's company doesn't have Stripe Connect account
**Solution:**
1. Login as the product's company
2. Go to `/settings/payments`
3. Complete Stripe Connect onboarding
4. Try checkout again

### Issue 2: Payment Element not appearing
**Cause:** Missing Stripe publishable key
**Solution:** Check `.env.local` has `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Issue 3: "Cannot find module './CheckoutForm'"
**Cause:** TypeScript cache issue
**Solution:** Restart TypeScript server or dev server

### Issue 4: Redirect loop on checkout
**Cause:** Auth middleware blocking
**Solution:** Check `middleware.ts` allows `/checkout/*` routes

### Issue 5: Success page shows "Order not found"
**Cause:** Payment intent not saved to database
**Solution:** Check API route logs, verify Supabase connection

---

## 📊 Success Metrics

After testing, verify:
- ✅ **5+ successful purchases** from different products
- ✅ **Payment intents** created in database
- ✅ **Stripe payments** visible in dashboard
- ✅ **Platform fees** calculated correctly (10%)
- ✅ **No console errors** during checkout flow
- ✅ **Responsive design** works on mobile/tablet/desktop
- ✅ **All animations** smooth and professional
- ✅ **Error handling** graceful for declined cards

---

## 🚀 Next Features to Test (Phase 3)

Once Phase 2 (checkout) is working:

1. **Order Management:**
   - Customer dashboard showing all purchases
   - Company dashboard showing all sales
   - Order status tracking

2. **Stripe Webhooks:**
   - Automated order creation on payment success
   - Email notifications
   - Refund handling

3. **Additional Features:**
   - Order messaging/chat
   - File deliverables upload
   - Review and rating system

---

## 📝 Test Results Template

Copy and fill out after testing:

```
Date: ___________
Tester: ___________

✅ Product details page loads correctly
✅ Checkout page initializes
✅ Payment Element renders
✅ Test card (4242) succeeds
✅ Success page displays correctly
✅ Payment intent created in DB
✅ Payment visible in Stripe
✅ Platform fee calculated correctly (10%)
✅ Declined card shows error
✅ Mobile responsive design works
✅ All animations smooth
✅ No console errors

Issues Found:
1. 
2. 
3. 

Notes:
```

---

**Last Updated:** January 12, 2026
**Phase:** 2 - Checkout & Payment
**Status:** ✅ Ready for Testing
