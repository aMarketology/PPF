# Testing Setup Complete! ✅

## What We've Set Up

### 1. Testing Framework ✅
**Installed Dependencies:**
- `@testing-library/react` - React component testing
- `@testing-library/jest-dom` - DOM matchers
- `@testing-library/user-event` - User interaction simulation
- `jest` - Test runner
- `jest-environment-jsdom` - DOM environment for tests
- `@types/jest` - TypeScript support

### 2. Configuration Files ✅
**Created Files:**
- `jest.config.ts` - Jest configuration with Next.js support
- `jest.setup.js` - Test environment setup and mocks
- `__tests__/utils/supabase-mock.ts` - Supabase mocking utilities

**What's Mocked:**
- Next.js router (`next/navigation`)
- Framer Motion animations
- React Hot Toast notifications
- Supabase client

### 3. Test Utilities ✅
**Created Helper Functions:**
- `setupAuthenticatedUser()` - Mock logged-in user
- `setupUnauthenticatedUser()` - Mock guest user
- `setupProfileData()` - Mock user profile
- `setupCompanyData()` - Mock company data
- `setupConversationsData()` - Mock conversations
- `setupMessagesData()` - Mock messages
- `mockSuccessfulSignup()` - Mock signup success
- `mockFailedSignup()` - Mock signup failure
- `resetAllMocks()` - Clean state between tests

### 4. Component Tests ✅
**Created `/tests__/components/ContactCompanyForm.test.tsx`**

**Test Coverage:**
- ✅ Initial rendering
- ✅ Modal opening/closing
- ✅ Guest user form (with contact fields)
- ✅ Authenticated user form (pre-filled)
- ✅ Form validation
- ✅ Successful submission
- ✅ Error handling
- ✅ Custom props and callbacks
- ✅ Loading states

**62 test cases covering:**
- Form display
- User authentication detection
- Field validation
- Data submission
- Success/error states
- Modal controls

### 5. NPM Scripts ✅
**Added to package.json:**
```json
{
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

## How to Run Tests

### Run All Tests:
```bash
npm test
```

### Watch Mode (auto-rerun on changes):
```bash
npm run test:watch
```

### Coverage Report:
```bash
npm run test:coverage
```

### Run Specific Test File:
```bash
npm test ContactCompanyForm
```

### Run Tests Matching Pattern:
```bash
npm test -- --testNamePattern="Guest User"
```

## Manual Testing Guide

### Test 1: Guest User Messaging
1. **Open browser** (not logged in)
2. **Navigate to marketplace** or any service page
3. **Add ContactCompanyForm component** to page:
   ```tsx
   <ContactCompanyForm
     companyId="your-company-id"
     companyName="Test Company"
     contextType="service"
   />
   ```
4. **Click "Contact Company"** button
5. **Fill out form:**
   - Name: Test Guest
   - Email: guest@test.com
   - Phone: (555) 123-4567
   - Subject: Test Message
   - Message: This is a test message from a guest user
6. **Click "Send Message"**
7. **Expected:** Success message appears
8. **Verify in messages inbox** (`/messages`) as company user

### Test 2: Authenticated User Messaging
1. **Sign up/Login** as a client
2. **Navigate to a service** with contact button
3. **Click "Contact Company"**
4. **Expected:** Name and email pre-filled
5. **Fill only:**
   - Subject: Project Inquiry
   - Message: I need engineering services
6. **Click "Send Message"**
7. **Expected:** Success confirmation
8. **Verify:** Message appears in company inbox

### Test 3: Company Receives & Replies
1. **Login as engineer**/company owner
2. **Go to `/messages`**
3. **Expected:** See all conversations with unread counts
4. **Click on a conversation**
5. **Expected:** See full message thread
6. **Type a reply** and press Enter
7. **Expected:** Reply appears in thread
8. **Test status change:** Click "Close" or "Archive"

### Test 4: Company Signup Flow
1. **Go to `/signup`**
2. **Step 1 - Account:**
   - Name: Test Engineer
   - Email: engineer@test.com
   - Password: TestPass123
   - User Type: **Offer Engineering Services (Engineer)**
   - Agree to terms
   - Click Continue
3. **Step 2 - Profile:**
   - Location: Los Angeles, CA
   - Bio: Professional engineering services
   - Click Continue
4. **Step 2.5 - Company (Engineers Only):**
   - Company Name: Test Engineering Co.
   - Description: We provide excellent engineering services
   - Email: contact@testeng.com
   - Phone: (555) 987-6543
   - Website: https://testeng.com
   - Address: 123 Main St
   - City: Los Angeles
   - State: CA
   - Zip: 90001
   - Specialties: Mechanical, Electrical, Civil
   - Click "Complete Setup"
5. **Step 3:** Success screen
6. **Verify in database:**
   ```sql
   SELECT * FROM company_profiles WHERE name = 'Test Engineering Co.';
   SELECT * FROM company_team_members WHERE company_id = (above id);
   ```

### Test 5: Client Signup Flow
1. **Go to `/signup`**
2. **Step 1:** Fill info, choose "Find Engineering Services (Client)"
3. **Step 2:** Fill profile info
4. **Step 3:** Success (no company step)
5. **Verify:** No company profile created

### Test 6: Company Settings
1. **Login as engineer**
2. **Go to `/settings/company`**
3. **Expected:** Form pre-filled with company data
4. **Edit any fields:**
   - Change phone number
   - Update description
   - Add specialties
5. **Click "Save Changes"**
6. **Expected:** Success message
7. **Refresh page**
8. **Verify:** Changes persisted

## Database Verification Queries

### Check Company Profiles:
```sql
SELECT * FROM company_profiles ORDER BY created_at DESC LIMIT 10;
```

### Check Conversations:
```sql
SELECT 
  c.*,
  COALESCE(p.full_name, c.guest_name) as sender_name
FROM conversations c
LEFT JOIN profiles p ON c.user_id = p.id
ORDER BY c.last_message_at DESC;
```

### Check Messages:
```sql
SELECT 
  m.*,
  c.subject
FROM messages m
JOIN conversations c ON m.conversation_id = c.id
ORDER BY m.created_at DESC
LIMIT 20;
```

### Check Unread Messages:
```sql
SELECT 
  c.company_id,
  c.subject,
  COUNT(m.id) as unread_count
FROM conversations c
JOIN messages m ON c.id = m.conversation_id
WHERE m.is_read = false 
AND m.sender_type != 'company'
GROUP BY c.company_id, c.subject;
```

## Test Checklist

### Signup System:
- [ ] Client signup (3 steps, no company)
- [ ] Engineer signup (3.5 steps, includes company)
- [ ] Form validation works
- [ ] Company profile created in database
- [ ] Owner auto-added to team_members
- [ ] Profile data saved correctly

### Messaging System:
- [ ] Guest can send message (form shows contact fields)
- [ ] Authenticated user can send message (contact pre-filled)
- [ ] Message appears in company inbox
- [ ] Unread count displays correctly
- [ ] Company can read messages
- [ ] Company can reply to messages
- [ ] Reply appears in thread
- [ ] Close/archive conversation works
- [ ] Guest info displays in inbox

### Company Settings:
- [ ] Settings page loads for engineers
- [ ] Form pre-fills with company data
- [ ] Can edit all fields
- [ ] Changes save to database
- [ ] Non-engineers cannot access
- [ ] Team members can edit (future)

## Success Criteria ✅

All systems are ready for testing:
- ✅ Test framework installed and configured
- ✅ Mock utilities created
- ✅ Component tests written
- ✅ Manual test guide provided
- ✅ Database queries documented
- ✅ Test scripts in package.json

Run `npm test` to execute automated tests, then follow the manual testing guide to verify end-to-end functionality!
