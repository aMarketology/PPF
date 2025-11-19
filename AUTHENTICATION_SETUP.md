# Authentication Setup - Simplified Profiles Schema

## Database Schema

The profiles table has been simplified to match your exact requirements:

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  user_type TEXT DEFAULT 'client' CHECK (user_type IN ('client', 'engineer')),
  company_name TEXT,
  bio TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);
```

## Updated Files

### 1. **app/signup/page.tsx**
- ✅ Simplified to 2-step signup process
- ✅ User types: 'client' or 'engineer' (no more 'buyer', 'seller', 'both')
- ✅ Professional form only collects:
  - Company (optional)
  - Location (required)
  - Bio (required, 10+ characters)
- ✅ Removed: title, experience, specialties, hourlyRate
- ✅ Direct Supabase integration (creates auth user + updates profile)
- ✅ **No email confirmation required** - users are logged in immediately
- ✅ Success screen redirects to /marketplace

### 2. **app/actions/auth.ts**
- ✅ `signUp()` - Creates user and updates simplified profiles table
- ✅ `signIn()` - Standard login
- ✅ `signOut()` - Logout and redirect
- ✅ `getUser()` - Fetches user with profile data (no engineer_profiles table)
- ✅ `updateProfile()` - Updates profile fields (full_name, avatar_url, company_name, bio, location)
- ✅ `getUserProfile()` - Get any user's profile by ID

### 3. **app/login/page.tsx**
- ✅ Already working correctly with simplified schema
- ✅ Uses signIn() action from auth.ts
- ✅ No changes needed

### 4. **supabase/migrations/001_create_profiles.sql**
- ✅ Complete migration file with:
  - update_updated_at() function
  - profiles table creation
  - Indexes
  - Triggers for auto-updating updated_at
  - Row Level Security policies
  - Automatic profile creation on user signup

## Sign Up Flow

1. **Step 1 - Account Setup**
   - Full Name
   - Email
   - Password
   - Confirm Password
   - User Type (Client or Engineer)
   - Terms acceptance

2. **Step 2 - Profile Details**
   - Company (optional)
   - Location (required)
   - Bio (required, 10+ chars)
   - **On submit**: Creates Supabase auth user + updates profile table
   - **No email confirmation needed** - user is logged in immediately

3. **Step 3 - Success**
   - Welcome message
   - Redirects to /marketplace

## User Types

- **client**: Find Engineering Services
- **engineer**: Offer Engineering Services

## Database Setup Instructions

1. Go to your Supabase SQL Editor
2. Run the migration file: `supabase/migrations/001_create_profiles.sql`
3. This will:
   - Create the update_updated_at() function
   - Create the profiles table
   - Set up indexes and triggers
   - Enable RLS and create policies
   - Set up automatic profile creation on signup

4. **Disable Email Confirmation**:
   - Go to Supabase Dashboard → **Authentication** → **Settings**
   - Under **Email Auth**, find "**Enable email confirmations**"
   - **Toggle it OFF** (disable it)
   - Click **Save**
   - See `SUPABASE_EMAIL_SETTINGS.md` for detailed instructions

## Testing Checklist

- [ ] Sign up as Client
- [ ] Sign up as Engineer
- [ ] Verify profile is created in profiles table
- [ ] Log in with created account
- [ ] Check Navigation shows correct auth state
- [ ] Update profile information
- [ ] Log out

## Schema Benefits

- ✅ Simple, single table design
- ✅ Easy to query and maintain
- ✅ No complex joins needed
- ✅ Fast profile lookups
- ✅ Flexible for both user types
- ✅ Room for growth (can add fields later)
