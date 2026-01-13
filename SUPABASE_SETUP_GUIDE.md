# Supabase Database Setup Guide

## Overview
This guide will help you set up your Supabase database with all necessary tables for the marketplace platform including users, companies, products, orders, and payments.

## Prerequisites
- Supabase account (sign up at https://supabase.com)
- Supabase CLI installed ✅ (already installed)
- A Supabase project created

## Step 1: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - Project Name: `precision-project-flow` (or your choice)
   - Database Password: (choose a strong password and save it)
   - Region: Choose closest to your users
4. Wait for project to be created (~2 minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Project Settings** → **API**
2. Copy the following values:

```bash
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public key: eyJhbGc...
service_role key: eyJhbGc... (keep this secret!)
```

## Step 3: Create Environment Variables

Create a `.env.local` file in the project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key...

# Supabase Service Role (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key...

# Stripe Configuration (for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 4: Apply Database Migrations

You have two options:

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste each migration file in order:
   - `supabase/migrations/001_create_profiles.sql`
   - `supabase/migrations/002_company_profiles_and_projects.sql`
   - `supabase/migrations/003_create_messaging_system.sql`
   - `supabase/migrations/004_user_to_user_messaging.sql`
   - `supabase/migrations/005_stripe_payments_and_products.sql`
5. Run each migration (click **Run** button)
6. Verify no errors appear

### Option B: Using Supabase CLI

```bash
# Link your project
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push

# Or apply specific migration
supabase db push --include-all
```

## Step 5: Verify Database Setup

Run this query in SQL Editor to verify all tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see these tables:
- ✅ profiles
- ✅ company_profiles
- ✅ projects
- ✅ services
- ✅ products
- ✅ product_orders
- ✅ payment_intents
- ✅ stripe_connect_accounts
- ✅ stripe_transfers
- ✅ platform_fees
- ✅ refunds
- ✅ messages (if using messaging)

## Step 6: Configure Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates (optional but recommended)
4. Set up redirect URLs:
   - Site URL: `http://localhost:3000` (dev) or your production URL
   - Redirect URLs: Add `http://localhost:3000/**` and your production URL

## Step 7: Test Database Connection

Run the test script:

```bash
npm run test:db
```

Or create a quick test:

```javascript
// test-db.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testConnection() {
  const { data, error } = await supabase
    .from('products')
    .select('count');
  
  if (error) {
    console.error('❌ Database connection failed:', error);
  } else {
    console.log('✅ Database connected successfully!');
    console.log('Products in database:', data);
  }
}

testConnection();
```

## Database Schema Overview

### Core Tables

1. **profiles** - User profiles (automatically created on signup)
2. **company_profiles** - Company information for sellers
3. **products** - Products/services listed by companies
4. **product_orders** - Customer orders with status tracking
5. **payment_intents** - Stripe payment tracking
6. **stripe_connect_accounts** - Company payout accounts

### Row Level Security (RLS)

All tables have RLS enabled with policies:
- ✅ Users can only view/edit their own data
- ✅ Companies can manage their own products
- ✅ Public can view active products
- ✅ Buyers and sellers can view their orders

## Common Issues & Solutions

### Issue: "relation does not exist"
**Solution:** Make sure all migrations ran successfully. Run them again in order.

### Issue: "permission denied for table"
**Solution:** Check RLS policies. Make sure you're authenticated when testing.

### Issue: "cannot insert into table"
**Solution:** Verify foreign key relationships. Create company_profile before creating products.

## Next Steps

1. ✅ Database setup complete
2. ✅ Run seed script to add test data: `node scripts/seed-test-data.js`
3. ✅ Start development server: `npm run dev`
4. ✅ Test signup flow
5. ✅ Create a company profile
6. ✅ Post a product
7. ✅ Test purchasing flow

## Production Deployment

Before deploying to production:

1. Update environment variables in your hosting platform
2. Set production Supabase URL and keys
3. Configure production Stripe keys
4. Test authentication flows
5. Verify RLS policies are working
6. Set up database backups in Supabase dashboard
7. Configure email templates for production domain

## Useful Commands

```bash
# Check Supabase status
supabase status

# View database logs
supabase db logs

# Reset database (⚠️ DESTRUCTIVE)
supabase db reset

# Create new migration
supabase migration new migration_name

# Generate TypeScript types
supabase gen types typescript --local > lib/database.types.ts
```

## Support

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- GitHub Issues: Check your repo's issues tab
