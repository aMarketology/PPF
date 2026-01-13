# 🧪 Product Marketplace Testing Guide

**Server:** 🟢 Running at http://localhost:3000  
**Date:** January 12, 2026

---

## ⚡ Quick Start Testing (5 minutes)

### Test URLs to Visit:
1. **Product Dashboard:** http://localhost:3000/products
2. **Create Product:** http://localhost:3000/products/create
3. **Stripe Settings:** http://localhost:3000/settings/payments
4. **Marketplace:** http://localhost:3000/marketplace/products

---

## 🎯 Quick Test Flow

### Step 1: Check Stripe Connection (1 min)
```
Navigate to: http://localhost:3000/settings/payments

Expected:
✅ See "Stripe Connect" section
✅ Either "Connect with Stripe" button OR connected status
```

**If NOT connected:**
- Click "Connect with Stripe"
- Complete Stripe onboarding (test mode)
- Return and verify: Charges enabled ✓, Payouts enabled ✓

---

### Step 2: Create a Test Product (2 mins)
```
Navigate to: http://localhost:3000/products/create

Fill in:
- Name: "Structural Analysis Report"
- Description: "Comprehensive structural engineering analysis for commercial buildings"
- Price: 500
- Currency: USD
- Category: "Structural Engineering"
- Delivery Time: 7
- Image URL: (leave blank)

Expected:
✅ Real-time fee calculator shows: You receive $450.00 (after 10% fee)
✅ Form validates on submit
✅ Success toast appears
✅ Redirects to /products dashboard
```

---

### Step 3: Test Product Management (1 min)
```
Navigate to: http://localhost:3000/products

Test Actions:
1. ✅ Click "Hide" → Product becomes hidden
2. ✅ Click "Show" → Product becomes active again
3. ✅ Click "Edit" → Form loads with data
4. ✅ Change name → Click "Update Product"
```

---

### Step 4: Browse Marketplace (1 min)
```
Navigate to: http://localhost:3000/marketplace/products

Test:
1. ✅ Your product appears in grid
2. ✅ Type "Structural" in search → Filters instantly
3. ✅ Select category filter → Filters work
4. ✅ Change sort order → Re-sorts instantly
5. ✅ Click product card → (details page coming in Phase 2)
```

---

## 🔍 Detailed Testing Checklist

### Company Features:

#### Product Creation:
- [ ] Form loads correctly
- [ ] All fields visible
- [ ] Validation works (try submitting empty)
- [ ] Fee calculator updates in real-time
- [ ] Success creates product
- [ ] Redirects to dashboard

#### Product Dashboard:
- [ ] Products display in grid
- [ ] Active/Hidden badges correct
- [ ] Edit button works
- [ ] Hide/Show toggle works
- [ ] Delete button works (with confirmation)
- [ ] Empty state shows if no products

#### Product Editing:
- [ ] Form pre-populates with data
- [ ] Can update all fields
- [ ] Validation still works
- [ ] Save updates product
- [ ] Changes reflect in dashboard

---

### Customer Features:

#### Marketplace Browsing:
- [ ] All active products visible
- [ ] Product cards display correctly:
  - [ ] Image or placeholder
  - [ ] Category badge
  - [ ] Product name
  - [ ] Description (truncated)
  - [ ] Company name
  - [ ] Delivery time
  - [ ] Price formatted
  - [ ] "Buy Now" button

#### Search:
- [ ] Real-time filtering (no page reload)
- [ ] Searches product name
- [ ] Searches description
- [ ] Searches company name
- [ ] Case-insensitive
- [ ] Shows "no results" message when empty

#### Filter by Category:
- [ ] "All Categories" shows everything
- [ ] Selecting category filters instantly
- [ ] Results counter updates
- [ ] Can clear filter

#### Sort Options:
- [ ] Newest First (default)
- [ ] Price: Low to High
- [ ] Price: High to Low
- [ ] Name: A-Z

#### Combined Filters:
- [ ] Search + Category filter works
- [ ] Search + Sort works
- [ ] All three together work
- [ ] Results counter accurate

---

### Responsive Design:

#### Desktop (current view):
- [ ] 3-column grid
- [ ] All filters on one row
- [ ] Hover effects work

#### Tablet (~800px width):
- [ ] 2-column grid
- [ ] Filters accessible
- [ ] Readable text

#### Mobile (~400px width):
- [ ] 1-column grid
- [ ] Filters stack vertically
- [ ] No horizontal scroll
- [ ] Touch-friendly buttons

---

### Edge Cases:

- [ ] Create product with minimum price ($1.00)
- [ ] Create product with long name (50+ chars)
- [ ] Create product with long description (500+ chars)
- [ ] Hide all products → marketplace shows empty state
- [ ] Search with no results → shows message
- [ ] Form with invalid URL → shows error

---

## ✅ Success Criteria

**Phase 1 is ready if:**
- ✅ Can connect Stripe account
- ✅ Can create products
- ✅ Can edit products
- ✅ Can toggle visibility
- ✅ Can delete products
- ✅ Marketplace shows all active products
- ✅ Search filters correctly
- ✅ Category filter works
- ✅ Sort options work
- ✅ Responsive design works
- ✅ No console errors
- ✅ Toast notifications appear
- ✅ Loading states show

---

## 🐛 Common Issues & Fixes

### Issue: "No company profile found"
**Fix:** Create a company profile first at `/profile` or `/signup`

### Issue: "Stripe Connect Required"
**Fix:** Visit `/settings/payments` and connect Stripe account

### Issue: Products not showing in marketplace
**Fix:** Make sure product `is_active` is true (toggle "Show" in dashboard)

### Issue: Form won't submit
**Fix:** Check all required fields have valid values:
- Name: 3+ characters
- Description: 20+ characters  
- Price: ≥ $1.00
- Category: Selected

---

## 📊 Test Results

**Quick Test Results:**
- [ ] ✅ Stripe Connect: PASS
- [ ] ✅ Create Product: PASS
- [ ] ✅ Product Dashboard: PASS
- [ ] ✅ Marketplace Browse: PASS
- [ ] ✅ Search & Filter: PASS

**Overall:** ⬜ READY / ⬜ NEEDS FIXES

---

## 🎬 What to Test

### NOW (Phase 1):
1. Company product management (CRUD)
2. Marketplace browsing
3. Search and filtering
4. UI/UX and responsiveness

### LATER (Phase 2):
1. Product details page (individual product view)
2. Checkout flow
3. Payment processing
4. Order management

---

## 🚀 Testing Commands

```bash
# Server already running at http://localhost:3000

# Open in browser:
open http://localhost:3000/products
open http://localhost:3000/marketplace/products

# Check for TypeScript errors:
npm run build

# View server logs:
# Check the terminal where npm run dev is running
```

---

## 📝 Your Test Notes

Document any issues or observations here:

```
Date: January 12, 2026
Tester: 

Findings:
- 
- 
- 

Issues Found:
- 
- 

Suggestions:
- 
- 
```

---

**Ready to test!** 🎯  
Start with the **Quick Test Flow** above, then do detailed testing if everything works!

