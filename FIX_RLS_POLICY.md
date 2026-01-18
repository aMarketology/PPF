# 🔧 Fix RLS Policy Error - Vendor Signup

## ❌ The Problem

When vendors try to sign up, they get this error:
```
POST https://vqmadoejowuyvdrisnyd.supabase.co/rest/v1/company_profiles 401 (Unauthorized)
Company creation error: {code: '42501', message: 'new row violates row-level security policy for table "company_profiles"'}
```

**Root Cause**: The RLS (Row-Level Security) policy on `company_profiles` table is checking if the user is an 'engineer', but the check happens before the profile update is fully committed in the database.

## ✅ The Solution

I've created two fixes:

### 1. **Updated RLS Policy** (Database Fix)
   - File: `supabase/migrations/007_fix_company_profiles_rls.sql`
   - Makes the policy check BOTH the profiles table AND the auth metadata
   - Adds fallback checks for better reliability

### 2. **Added Delay in Signup** (Code Fix)
   - File: `app/signup/page.tsx`
   - Adds 500ms delay after profile update before creating company
   - Ensures database transaction is committed
   - Better error handling

## 🚀 How to Apply the Fix

### Option 1: Via Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   ```
   https://supabase.com/dashboard/project/vqmadoejowuyvdrisnyd
   ```

2. **Navigate to SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "+ New Query"

3. **Copy the Migration**
   ```bash
   cat supabase/migrations/007_fix_company_profiles_rls.sql | pbcopy
   ```

4. **Paste and Run**
   - Paste the SQL into the editor
   - Click "Run" (or press Cmd/Ctrl + Enter)
   - You should see: ✅ "Success. No rows returned"

### Option 2: Via Supabase CLI

```bash
# If you have Supabase CLI installed
supabase db push
```

### Option 3: Manual Copy-Paste

Open the file:
```
supabase/migrations/007_fix_company_profiles_rls.sql
```

Copy all the content and run it in your Supabase SQL Editor.

## 🧪 Test After Applying

1. **Clear any failed signups** (optional):
   ```sql
   -- In Supabase SQL Editor, if you want to clean up test accounts:
   DELETE FROM auth.users WHERE email LIKE '%test%';
   ```

2. **Try vendor signup again**:
   - Go to http://localhost:3000/get-started
   - Click "I Offer Services"
   - Fill out the form
   - Should now complete successfully! ✅

## 📋 What Changed in the Migration

### Before (Restrictive):
```sql
CREATE POLICY "company_profiles_insert" ON public.company_profiles 
    FOR INSERT WITH CHECK (
        auth.uid() = owner_id AND 
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'engineer')
    );
```

### After (Flexible):
```sql
CREATE POLICY "company_profiles_insert" ON public.company_profiles 
    FOR INSERT WITH CHECK (
        auth.uid() = owner_id AND 
        auth.uid() IS NOT NULL AND
        (
            -- Check profiles table
            EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'engineer')
            OR
            -- Check auth metadata (fallback during signup)
            (auth.jwt()->>'user_type' = 'engineer')
            OR
            (auth.jwt()->'user_metadata'->>'user_type' = 'engineer')
        )
    );
```

## 🔍 Verification

After applying the fix, check:

1. **Policy is Updated**:
   ```sql
   -- Run in Supabase SQL Editor
   SELECT * FROM pg_policies 
   WHERE tablename = 'company_profiles' 
   AND policyname = 'company_profiles_insert';
   ```

2. **Signup Works**:
   - No more 401 errors
   - Company profile created successfully
   - User redirected to `/products/create`

## 🆘 Troubleshooting

### Still Getting 401 Error?

1. **Check if migration was applied**:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'company_profiles';
   ```

2. **Verify user_type is set**:
   ```sql
   SELECT id, email, raw_user_meta_data->>'user_type' as user_type 
   FROM auth.users 
   WHERE email = 'your-test-email@example.com';
   ```

3. **Check profile was created**:
   ```sql
   SELECT * FROM profiles 
   WHERE email = 'your-test-email@example.com';
   ```

### Need to Reset?

```sql
-- Delete test user and related data
DELETE FROM auth.users WHERE email = 'your-test-email@example.com';
-- Profile will be auto-deleted due to CASCADE
```

## 📝 Summary

- ✅ **Code Updated**: Added delay and better error handling in signup
- ✅ **Migration Created**: New RLS policy with fallback checks
- 🎯 **Next Step**: Apply the migration in Supabase Dashboard
- 🧪 **Then**: Test vendor signup again!

The code changes are already applied (your dev server will hot-reload). You just need to run the SQL migration in Supabase! 🚀
