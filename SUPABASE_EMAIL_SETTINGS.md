# Supabase Email Confirmation Settings

## How to Disable Email Confirmation

To allow users to sign up without email confirmation:

### Option 1: Via Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Settings**
3. Scroll to **Email Auth**
4. Find "**Enable email confirmations**"
5. **Toggle it OFF** (disable it)
6. Click **Save**

### Option 2: Via SQL

Run this in your Supabase SQL Editor:

```sql
-- Check current auth settings
SELECT * FROM auth.config;

-- Update to disable email confirmation
UPDATE auth.config 
SET value = 'false' 
WHERE parameter = 'enable_signup';
```

### Current Sign-Up Behavior

- ✅ Users can sign up immediately without email verification
- ✅ Users are logged in right after signup
- ✅ No confirmation email is sent
- ✅ Users can access the platform immediately

### Bio Requirements

- Changed from 50 characters to **10 characters minimum**
- More user-friendly for quick signups

### Testing

After disabling email confirmation:

1. Sign up with a new account
2. You should be logged in immediately
3. No email verification required
4. Profile should be created in the database
5. You should be redirected to `/marketplace`

## Important Notes

- Make sure "Confirm email" is **DISABLED** in Supabase Auth settings
- Without this setting, users will see "Check your email to confirm" message
- The code is already updated to not require email confirmation
- Just need to change the Supabase dashboard setting
