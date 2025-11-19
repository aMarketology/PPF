# User Dashboard & Profile Pages

## Overview

Complete authentication-aware navigation with dynamic user dropdown and three new user pages: Profile, Orders, and Settings.

## Updated Navigation

### Features:
- **Real Auth Integration**: Uses `getUser()` to check authentication status
- **Dynamic Dropdown**: Shows different menu based on login state
- **User Avatar**: Displays first letter of user's name
- **User Type Badge**: Shows "Engineer" or "Client" badge

### Logged-Out Menu:
- Get Started dropdown with:
  - Sign Up button
  - Log In button
  - "Join 2,000+ engineers" message

### Logged-In Menu:
- User avatar with name
- Dropdown with:
  - **Profile** - View/edit profile
  - **Orders** - Track service orders
  - **Settings** - Account settings
  - **Sign Out** - Logout (with real signOut() function)

### Mobile Menu:
- Fully responsive
- Same functionality as desktop
- User info card in mobile menu

## New Pages

### 1. Profile Page (`/profile`)

**Features:**
- View full profile information
- Edit mode with inline editing
- Real-time updates using Supabase
- Fields:
  - Full Name (editable)
  - Email (read-only)
  - Company (editable)
  - Location (editable)
  - Bio (editable, textarea)
- User type badge (Engineer/Client)
- Avatar with first letter
- Save/Cancel buttons

**Auth Protection:**
- Redirects to `/login` if not authenticated
- Loads user data from Supabase
- Updates profile using `updateProfile()` action

### 2. Orders Page (`/orders`)

**Features:**
- List of all service orders
- Filter by status:
  - All Orders
  - Pending
  - In Progress
  - Completed
- Each order shows:
  - Service name
  - Description
  - Status badge with icon
  - Date
  - Amount
  - Engineer name
  - Action buttons (View Details, Review)
- Order summary stats:
  - Total orders
  - In progress count
  - Completed count
  - Total spent

**Current State:**
- Uses mock data (placeholder)
- Ready to connect to real Supabase orders table
- Status colors: Yellow (pending), Blue (in progress), Green (completed), Red (cancelled)

### 3. Settings Page (`/settings`)

**Features:**
- Tabbed interface with 4 sections:

#### Account Tab:
- Account type display
- Email address
- Member since date
- Delete account button (danger zone)

#### Security Tab:
- Change password button
- Two-factor authentication toggle
- Active sessions list

#### Notifications Tab:
- Email notification preferences:
  - Order updates
  - New messages
  - Marketing emails
  - Weekly summary
- Toggle switches for each option

#### Privacy Tab:
- Profile visibility toggle
- Show email toggle
- Download my data button
- Privacy policy link
- Terms of service link

**Design:**
- Sidebar navigation
- Clean tab interface
- Toggle switches for settings
- Responsive layout

## File Structure

```
app/
├── components/
│   └── Navigation.tsx (updated with real auth)
├── profile/
│   └── page.tsx (new)
├── orders/
│   └── page.tsx (new)
├── settings/
│   └── page.tsx (new)
└── actions/
    └── auth.ts (using getUser, signOut, updateProfile)
```

## Auth Integration

All pages use:
- `getUser()` - Check if user is logged in
- `signOut()` - Logout functionality
- `updateProfile()` - Update user profile data

### Protected Routes:
- `/profile` - Requires login
- `/orders` - Requires login
- `/settings` - Requires login

All redirect to `/login` if not authenticated.

## Next Steps

### For Orders Page:
1. Create orders table in Supabase:
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  service_name TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  amount DECIMAL(10,2),
  engineer_name TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

2. Create server action to fetch orders:
```typescript
export async function getOrders(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}
```

3. Replace mock data with real data in orders page

### For Settings Page:
1. Implement password change functionality
2. Add two-factor authentication
3. Connect privacy toggles to database
4. Implement data export

## Testing Checklist

- [ ] Sign up new account
- [ ] Login and verify dropdown shows user name
- [ ] Navigate to Profile page
- [ ] Edit profile and save changes
- [ ] Navigate to Orders page
- [ ] Filter orders by status
- [ ] Navigate to Settings page
- [ ] Try all tabs (Account, Security, Notifications, Privacy)
- [ ] Sign out from dropdown
- [ ] Verify redirected to home page
- [ ] Test mobile menu

## Design Highlights

- ✅ Consistent blue color scheme
- ✅ Smooth animations with Framer Motion
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states for all pages
- ✅ Error handling with toast notifications
- ✅ Clean, modern UI with shadows and borders
- ✅ Icon integration (Lucide React)
- ✅ Professional typography
