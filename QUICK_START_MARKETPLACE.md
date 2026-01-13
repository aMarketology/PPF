# 🚀 Quick Start: Product Marketplace

**Get started selling and buying products in 5 minutes!**

---

## For Companies (Sellers)

### Step 1: Connect Your Stripe Account
```
1. Log in to your company account
2. Navigate to: Settings → Payments
3. Click "Connect with Stripe"
4. Complete Stripe onboarding
5. Wait for confirmation (charges & payouts enabled)
```

**URL:** `http://localhost:3000/settings/payments`

---

### Step 2: Create Your First Product
```
1. Navigate to: Products
2. Click "Add New Product"
3. Fill in the form:
   - Product Name (e.g., "Structural Analysis Report")
   - Description (minimum 20 characters)
   - Price (minimum $1.00)
   - Currency (USD, EUR, GBP, or CAD)
   - Category (select from dropdown)
   - Delivery Time (optional, in days)
   - Image URL (optional)
4. Review the fee breakdown (10% platform fee shown)
5. Click "Create Product"
```

**URL:** `http://localhost:3000/products/create`

**Price Example:**
- You set: $100
- Platform takes: $10 (10%)
- You receive: $90

---

### Step 3: Manage Your Products
```
1. View all products at: /products
2. Actions available:
   - ✏️ Edit: Update product details
   - 👁️ Hide: Remove from marketplace (still in your dashboard)
   - 👁️‍🗨️ Show: Make visible in marketplace
   - 🗑️ Delete: Permanently remove product
```

**URL:** `http://localhost:3000/products`

---

## For Customers (Buyers)

### Browse Products
```
1. Navigate to: Marketplace → Products
2. Use search bar to find products
3. Filter by category (dropdown)
4. Sort by:
   - Newest First
   - Price: Low to High
   - Price: High to Low
   - Name: A-Z
5. Click any product card to view details
```

**URL:** `http://localhost:3000/marketplace/products`

---

### Search Tips
- Search by product name
- Search by product description
- Search by company name
- Combine search with category filter

---

## Features at a Glance

### ✅ Built (Ready to Use)
- Stripe Connect integration
- Product creation and editing
- Product management dashboard
- Marketplace browsing
- Search and filtering
- Category organization
- Multi-currency support
- Real-time fee calculation
- Product visibility toggle

### ⏳ Coming Next (Phase 2)
- Individual product details page
- Shopping cart
- Checkout with Stripe Payment Element
- Order processing
- Order history
- Payment webhooks
- Order fulfillment tracking

---

## Testing Locally

### 1. Start Development Server
```bash
cd "/Users/thelegendofzjui/Documents/GitHub/Precision Project Flow"
npm run dev
```

### 2. Open in Browser
```
http://localhost:3000
```

### 3. Test Flow
1. **As Company Owner:**
   - Login → Settings → Payments → Connect Stripe
   - Products → Add New Product → Fill form → Submit
   - Products → See your product → Toggle visibility

2. **As Customer:**
   - Marketplace → Products → Browse products
   - Use search/filter
   - Click "Buy Now" (details page coming next)

---

## Categories Available

1. Structural Engineering
2. Mechanical Engineering
3. Electrical Engineering
4. Civil Engineering
5. Software Engineering
6. Consulting Services
7. Design Services
8. Analysis & Testing
9. Project Management
10. Other Services

---

## Troubleshooting

### "Stripe Connect Required" Message
**Problem:** Can't create products  
**Solution:** Complete Stripe Connect onboarding first at `/settings/payments`

### "No company profile found"
**Problem:** User account not linked to company  
**Solution:** Create a company profile first

### Products Not Showing in Marketplace
**Problem:** Product is hidden  
**Solution:** Go to `/products` and click "Show" button to activate

### Form Validation Errors
**Common Issues:**
- Product name too short (minimum 3 characters)
- Description too short (minimum 20 characters)
- Price below $1.00
- No category selected

---

## Platform Fees

| Transaction | Platform Fee | You Receive |
|------------|--------------|-------------|
| $10.00 | $1.00 (10%) | $9.00 |
| $50.00 | $5.00 (10%) | $45.00 |
| $100.00 | $10.00 (10%) | $90.00 |
| $500.00 | $50.00 (10%) | $450.00 |
| $1,000.00 | $100.00 (10%) | $900.00 |

**Note:** Fees are calculated automatically and shown in real-time during product creation.

---

## Database Tables Used

### `products`
- Stores all product/service listings
- Links to company_profiles
- Tracks active/inactive status
- Stores pricing and delivery info

### `stripe_connect_accounts`
- Links companies to Stripe accounts
- Tracks verification status
- Required before listing products

---

## Security Notes

### Access Control:
- ✅ Companies can only edit their own products
- ✅ Only active products shown to customers
- ✅ Stripe account required for listings
- ✅ Form validation prevents invalid data
- ✅ Database constraints enforce rules

### Payment Security:
- ✅ Stripe handles all payment processing
- ✅ No credit card data stored in your database
- ✅ PCI compliance handled by Stripe
- ✅ Secure payment flow (Stripe Connect)

---

## URLs Reference

| Page | URL | Access |
|------|-----|--------|
| Product Dashboard | `/products` | Companies only |
| Create Product | `/products/create` | Companies only (with Stripe) |
| Edit Product | `/products/edit/[id]` | Product owner only |
| Marketplace | `/marketplace/products` | Public |
| Stripe Settings | `/settings/payments` | Companies only |

---

## Support & Help

### Documentation:
- Full guide: `PRODUCT_MARKETPLACE_STATUS.md`
- Stripe setup: `STRIPE_INTEGRATION.md`
- Database schema: `supabase/migrations/005_stripe_payments_and_products.sql`

### Common Questions:

**Q: How long does Stripe Connect take?**  
A: Usually 5-10 minutes for test mode, longer for live mode

**Q: Can I change product prices after creating?**  
A: Yes, edit anytime from your product dashboard

**Q: Do I need to upload images?**  
A: No, images are optional. Default icons will be used.

**Q: Can customers see hidden products?**  
A: No, only active products appear in marketplace

**Q: What currencies are supported?**  
A: USD, EUR, GBP, and CAD

---

## What's Working Right Now ✅

1. ✅ Stripe Connect account linking
2. ✅ Product creation with full details
3. ✅ Product editing and updates
4. ✅ Product visibility toggle (show/hide)
5. ✅ Product deletion
6. ✅ Marketplace product browsing
7. ✅ Real-time search
8. ✅ Category filtering
9. ✅ Multiple sort options
10. ✅ Responsive design (mobile/desktop)
11. ✅ Form validation
12. ✅ Error handling with toasts
13. ✅ Loading states
14. ✅ Empty states with CTAs

---

## Next Phase Preview 🔮

Coming soon:
- 📦 Individual product detail pages
- 🛒 Shopping cart functionality
- 💳 Checkout with Stripe Payment Element
- 📧 Order confirmation emails
- 📊 Order management dashboards
- 🔔 Webhook event handling
- ⭐ Product reviews and ratings

---

**Ready to start?** Navigate to `/products` to create your first listing!

