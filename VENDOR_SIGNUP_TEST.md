# Vendor Signup & Product Listing Test Guide

## ✅ Fixed Issues
1. **Column name mismatch** - Fixed `name` → `company_name` in company_profiles
2. **Address field mismatch** - Fixed `address` → `street_address` 
3. **Streamlined vendor signup** - Removed unnecessary Step 2 for vendors, going straight to company form

## 🧪 Test Steps

### Step 1: Navigate to Get Started Page
```
http://localhost:3000/get-started
```

### Step 2: Click "I Offer Services" Button
This will redirect you to the signup page with `?type=provider` parameter

### Step 3: Fill Out Account Information (Step 1)

**Form Fields:**
- **Full Name**: `John Vendor`
- **Email**: `vendor@test-${Date.now()}.com` (use timestamp to avoid duplicates)
- **Password**: `SecurePass123!`
- **Confirm Password**: `SecurePass123!`
- **User Type**: Should be pre-selected as "Engineer/Provider"
- **Terms**: ✅ Check the box

Click **"Continue"**

### Step 4: Fill Out Company Information (Step 2)

**Company Details:**
- **Company Name**: `Precision Engineering Solutions`
- **Company Description**: `We specialize in high-precision CNC machining, custom part manufacturing, and rapid prototyping for aerospace, automotive, and industrial applications.`
- **Business Email**: `info@precisioneng.com`
- **Phone Number**: `4155551234`
- **Website**: `https://precisioneng.com` (optional)

**Address:**
- **Street Address**: `1234 Industrial Way`
- **City**: `San Francisco`
- **State**: `CA`
- **Zip Code**: `94107`

**Specialties:**
- `CNC Machining, 3D Printing, CAD Design, Prototyping`

Click **"Complete Setup"**

### Step 5: Automatic Redirect
After successful signup, you'll be redirected to:
```
/products/create
```

This is where vendors can list their first product!

## 🎯 Next: Create a Product

Once on the product creation page, you can list a real product that customers can purchase. Fill out:

1. **Product Name**: e.g., "Custom CNC Aluminum Parts"
2. **Description**: Detailed description of the service/product
3. **Price**: e.g., $150.00
4. **Category**: Select appropriate category
5. **Images**: Upload product images
6. **Specifications**: Any technical details

## 📊 Verification Checklist

- [ ] Vendor account created successfully in `auth.users`
- [ ] Profile created in `profiles` table with `user_type='engineer'`
- [ ] Company profile created in `company_profiles` table
- [ ] Redirected to `/products/create`
- [ ] No console errors during signup
- [ ] Email confirmation works (if enabled)

## 🐛 Troubleshooting

### Rate Limit Error (429)
If you see "For security purposes, you can only request this after X seconds":
- **Wait 60 seconds** before trying again
- Supabase has rate limiting on auth endpoints

### Database Errors
Check the browser console for detailed error messages. Common issues:
- RLS policies blocking insert
- Missing required fields
- Invalid data types

### Success Indicators
- Toast notification: "Account created successfully!"
- Progress indicator shows Step 3 (Complete)
- Redirects to product creation page after 2 seconds

## 🔄 Test Clean-Up

To test again with a fresh account:
1. Use a different email address
2. Or delete the test account from Supabase:
   ```sql
   DELETE FROM auth.users WHERE email = 'vendor@test.com';
   ```

## 📝 Notes

- **Simplified Flow**: Vendors no longer see the "Professional Profile" step
- **Direct to Company**: Vendors go straight from Account → Company → Success
- **Clients Still Get Profile Step**: The two-step system (Account → Profile → Success) remains for clients
