# 🧪 Test Data & Testing Guide

## ✅ Test Data Successfully Created!

We've populated your database with **5 realistic engineering companies** and **15 professional products** to thoroughly test the marketplace system.

---

## 🏢 Test Companies & Login Credentials

### 1. StructureTech Engineering
- **Email:** `contact@structuretech.com`
- **Password:** `TestPass123!`
- **Specialties:** Structural Analysis, Seismic Design, High-Rise Buildings
- **Products:** 3 structural engineering services ($2,500 - $7,500)

### 2. MechaniX Solutions
- **Email:** `info@mechanix.com`
- **Password:** `TestPass123!`
- **Specialties:** HVAC Design, Energy Modeling, Industrial Equipment
- **Products:** 3 mechanical engineering services ($1,800 - $5,000)

### 3. PowerDesign Electrical
- **Email:** `hello@powerdesign.com`
- **Password:** `TestPass123!`
- **Specialties:** Power Distribution, Lighting Design, Solar Integration
- **Products:** 3 electrical engineering services ($2,200 - $6,000)

### 4. CivilPro Engineering
- **Email:** `contact@civilpro.com`
- **Password:** `TestPass123!`
- **Specialties:** Site Development, Stormwater Management, Traffic Studies
- **Products:** 3 civil engineering services ($3,800 - $5,500)

### 5. CodeCrafters Software
- **Email:** `info@codecrafters.com`
- **Password:** `TestPass123!`
- **Specialties:** Web Development, Mobile Apps, Cloud Architecture
- **Products:** 3 software engineering services ($4,500 - $12,000)

---

## 🎯 Complete Testing Checklist

### Phase 1: Marketplace Browsing (No Login Required)

#### Test 1: View All Products
1. Open http://localhost:3000/marketplace/products
2. ✅ Verify you see 15 products displayed
3. ✅ Check that product cards show:
   - Product name
   - Company name
   - Price
   - Category badge
   - Delivery time
   - Product image

#### Test 2: Search Functionality
1. In the search bar, type "structural"
2. ✅ Results should filter to show StructureTech products only
3. Clear search and type "design"
4. ✅ Should show multiple products from different companies
5. Type "mobile app"
6. ✅ Should show CodeCrafters' mobile app product

#### Test 3: Category Filter
1. Click category dropdown
2. Select "Structural Engineering"
3. ✅ Should show only 3 structural products
4. Select "Mechanical Engineering"
5. ✅ Should show only 3 mechanical products
6. Select "All Categories"
7. ✅ Should show all 15 products again

#### Test 4: Sort Options
1. Select "Price: Low to High"
2. ✅ First product should be Energy Efficiency Audit ($1,800)
3. Select "Price: High to Low"
4. ✅ First product should be Mobile App Development ($12,000)
5. Select "Name: A-Z"
6. ✅ Products should be alphabetically sorted
7. Select "Newest First"
8. ✅ Most recently created products first

#### Test 5: Combined Filters
1. Search for "system"
2. Select category "Electrical Engineering"
3. ✅ Should show only electrical products with "system" in name/description
4. Clear filters and verify all products return

---

### Phase 2: Company Login & Product Management

#### Test 6: Login as Company
1. Go to http://localhost:3000/login
2. Login with: `contact@structuretech.com` / `TestPass123!`
3. ✅ Should redirect to profile or dashboard
4. Navigate to http://localhost:3000/products
5. ✅ Should see your 3 products listed

#### Test 7: View Product Dashboard
1. On `/products` page, verify each product shows:
   - ✅ Product name
   - ✅ Price with currency
   - ✅ Category
   - ✅ Status badge (Active/Inactive)
   - ✅ Edit button
   - ✅ Delete button
   - ✅ Visibility toggle

#### Test 8: Toggle Product Visibility
1. Find "Residential Structural Analysis" product
2. Click the toggle to hide it
3. ✅ Status should change to "Inactive"
4. ✅ Toast notification confirms change
5. Open new incognito tab → go to marketplace
6. ✅ Hidden product should NOT appear in marketplace
7. Return to dashboard, toggle it back on
8. ✅ Product should reappear in marketplace

#### Test 9: Edit Existing Product
1. Click "Edit" on any product
2. ✅ Form should pre-populate with existing data
3. Change the price from $2,500 to $2,750
4. Update the description
5. Click "Update Product"
6. ✅ Success toast appears
7. ✅ Redirected back to product dashboard
8. ✅ Changes are reflected in the list
9. Check marketplace → verify changes appear there too

#### Test 10: Create New Product
1. Click "Create New Product" button
2. Fill in the form:
   - **Name:** "Foundation Design Package"
   - **Description:** "Complete foundation engineering for residential projects"
   - **Price:** 3500
   - **Currency:** USD
   - **Category:** Structural Engineering
   - **Delivery Time:** 10 days
   - **Image URL:** https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400
3. ✅ Watch platform fee calculator update in real-time
4. ✅ Should show: You receive: $3,150 (Platform fee: $350)
5. Click "Create Product"
6. ✅ Success toast appears
7. ✅ Redirected to dashboard
8. ✅ New product appears in list (now 4 products)
9. Check marketplace → new product should be visible

#### Test 11: Form Validation
1. Go to create product page
2. Click "Create Product" without filling anything
3. ✅ Should see validation errors for required fields
4. Enter price as "abc" (invalid number)
5. ✅ Should show error for invalid price
6. Enter negative price like -100
7. ✅ Should show error "Price must be positive"
8. Fill valid data and submit
9. ✅ Should work correctly

#### Test 12: Delete Product
1. On product dashboard, find your newly created product
2. Click "Delete" button
3. ✅ Confirmation dialog appears
4. Click "Cancel"
5. ✅ Product remains in list
6. Click "Delete" again
7. Click "Confirm"
8. ✅ Product disappears from list
9. ✅ Success toast confirms deletion
10. Check marketplace → product should be gone

---

### Phase 3: Multi-Company Testing

#### Test 13: Switch Between Companies
1. Logout from StructureTech
2. Login as MechaniX: `info@mechanix.com` / `TestPass123!`
3. Go to `/products`
4. ✅ Should see only MechaniX's 3 products (not StructureTech's)
5. ✅ Verify you can edit/delete only your own products

#### Test 14: Marketplace Shows All Companies
1. While logged in as MechaniX
2. Go to marketplace `/marketplace/products`
3. ✅ Should see products from ALL companies (including StructureTech)
4. ✅ Each product card shows correct company name
5. ✅ No "Edit" or "Delete" buttons visible (this is read-only view)

#### Test 15: Create Product as Different Company
1. Still logged in as MechaniX
2. Go to `/products/create`
3. Create a new HVAC product:
   - **Name:** "Commercial Refrigeration Design"
   - **Description:** "Industrial cold storage and refrigeration systems"
   - **Price:** 6500
   - **Category:** Mechanical Engineering
   - **Delivery Time:** 25 days
4. ✅ Product created successfully
5. Check marketplace
6. ✅ New product appears with "MechaniX Solutions" company name

---

### Phase 4: Edge Cases & Security

#### Test 16: Stripe Connect Gate (Important!)
1. Login as one of the test companies
2. Go to `/products` dashboard
3. ✅ You should see a message: "Connect your Stripe account to start selling"
4. ✅ Products should NOT be editable/creatable until Stripe Connect is set up
5. (Note: For testing, you may need to mock Stripe Connect or temporarily disable this check)

#### Test 17: Unauthorized Access
1. Logout completely
2. Try to access `/products` directly
3. ✅ Should redirect to login page
4. Try to access `/products/create` directly
5. ✅ Should redirect to login page

#### Test 18: Cross-Company Security
1. Login as StructureTech
2. Note the ID of one of your products in the URL
3. Try to access `/products/edit/[someone_else's_product_id]`
4. ✅ Should either show error or redirect (should NOT allow editing)

---

## 🎨 Visual Quality Checks

### Test 19: Responsive Design
1. Open marketplace in browser
2. Resize window to mobile width (375px)
3. ✅ Products should stack in single column
4. ✅ Navigation should be mobile-friendly
5. ✅ Search/filter controls should be accessible
6. Resize to tablet (768px)
7. ✅ Products should display in 2 columns
8. Resize to desktop (1024px+)
9. ✅ Products should display in 3 columns

### Test 20: Loading States
1. Open marketplace with network throttling (Chrome DevTools)
2. ✅ Should see loading spinner or skeleton while data loads
3. ✅ Once loaded, products should smoothly appear

### Test 21: Empty States
1. Login as StructureTech
2. Delete all your products
3. Go to `/products` dashboard
4. ✅ Should see helpful empty state message
5. ✅ "Create New Product" button should be prominent

---

## 🐛 Known Issues to Watch For

### Common Issues:
1. **Products not appearing in marketplace**
   - Check: Is `is_active` set to true?
   - Check: Is company profile properly linked?
   
2. **Can't create products**
   - Check: Are you logged in?
   - Check: Do you have a company profile?
   - Check: Stripe Connect may be blocking (see Test 16)

3. **Search not working**
   - Check browser console for errors
   - Try refresh the page

4. **Images not loading**
   - Unsplash URLs should work
   - If not, check CORS settings

---

## 📊 Success Criteria

After completing all tests, you should have:

✅ **Marketplace Browsing:**
- 15 products visible from 5 companies
- Search, filter, and sort all working
- Responsive design on mobile/tablet/desktop

✅ **Company Dashboard:**
- Each company sees only their products
- Can create, edit, delete products
- Visibility toggle works correctly
- Real-time fee calculator shows 10% platform fee

✅ **Security:**
- Users can only edit their own products
- Unauthenticated users redirected to login
- RLS policies enforcing data access

✅ **User Experience:**
- Toast notifications for all actions
- Form validation prevents errors
- Loading and empty states display correctly
- Professional UI with good typography and spacing

---

## 🧹 Cleanup

When done testing, you can remove all test data:

```bash
node scripts/cleanup-test-data.js
```

This will delete all 5 test companies and their products.

---

## 🚀 Next Steps (Phase 2)

Once Phase 1 testing is complete and working:

1. **Product Details Page** - View individual product with full description
2. **Checkout Flow** - Stripe Payment Element for purchases
3. **Payment Processing** - Create Payment Intents, handle webhooks
4. **Order Management** - Customer and company order dashboards
5. **Email Notifications** - Order confirmations and updates

---

## 📝 Report Issues

If you find any bugs or unexpected behavior:

1. Note which test number failed
2. Check browser console for errors
3. Check network tab for failed API calls
4. Document exact steps to reproduce
5. Take screenshots if helpful

---

**Last Updated:** January 12, 2026
**Test Data Version:** 1.0
**Status:** ✅ Ready for Testing
