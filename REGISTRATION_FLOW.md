# Registration Flow Implementation

## Overview
This implementation handles the account creation flow with two paths: Individual and Enterprise, with proper page refresh handling.

## Flow Structure

### 1. Create Account Page (`/create-account`)
- User selects account type: Individual or Enterprise
- Selection is stored in Redux store and localStorage as backup
- Navigation to appropriate next step based on selection

### 2. Individual Flow
- **Basic Info Page** (`/basic-info`)
  - Collects user information
  - Validates registration data exists
  - Redirects to create account if no valid data

### 3. Enterprise Flow
- **Organization Info Page** (`/organization-info`)
  - Collects organization information
  - Validates registration data exists
  - Redirects to create account if no valid data

- **Organization Admin Info Page** (`/organization-admin-info`)
  - Collects admin information
  - Validates both account type and organization data exist
  - Redirects to organization info if organization data missing
  - Redirects to create account if no valid data

### 4. Common Flow
- **Two-Factor Authentication** (`/two-factor-authentication`)
  - Validates registration data exists
  - Redirects to create account if no valid data

- **Subscription Page** (`/subscription`)
  - Validates registration data exists
  - Clears localStorage when subscription is selected

## Key Features

### Page Refresh Protection
- **Registration Guard Hook**: `useRegistrationGuard()`
  - Checks for valid account type in Redux store
  - Falls back to localStorage if Redux data is missing
  - Redirects to create account page if no valid data found
  - Handles enterprise flow validation (organization data)

### Data Persistence
- **Redux Store**: Primary data storage
- **localStorage**: Backup storage for account type
- **Automatic Cleanup**: localStorage cleared on successful completion

### Route Protection
All registration flow pages use the `useRegistrationGuard()` hook to ensure:
- Users can't access later steps without completing earlier ones
- Page refreshes redirect to appropriate step
- Invalid states redirect to create account page

## Implementation Details

### Files Modified
1. `src/hooks/useRegistrationGuard.ts` - New guard hook
2. `src/pages/public/auth/createAccount/index.tsx` - Added localStorage backup
3. `src/pages/public/individual/basicInfo/index.tsx` - Added guard
4. `src/pages/public/enterPrise/organizationInfo/index.tsx` - Added guard
5. `src/pages/public/enterPrise/organizationAdminInfo/index.tsx` - Added guard
6. `src/pages/public/auth/twoFactorAuthentication/index.tsx` - Added guard
7. `src/pages/public/auth/subscription/index.tsx` - Added guard and cleanup
8. `src/store/slices/registeruserSlice.ts` - Added localStorage cleanup

### Usage
```typescript
import { useRegistrationGuard } from '../hooks/useRegistrationGuard';

const MyComponent = () => {
  const registerUserDetail = useRegistrationGuard();
  // Component will automatically redirect if no valid registration data
  // registerUserDetail contains the registration data
};
```

## Testing Scenarios

1. **Normal Flow**: User completes registration without refreshing
2. **Page Refresh**: User refreshes on any step → redirects to create account
3. **Direct URL Access**: User tries to access later steps directly → redirects to create account
4. **Enterprise Flow**: User refreshes on admin info without organization data → redirects to organization info
5. **Data Loss**: Redux store cleared → falls back to localStorage
6. **Invalid Data**: Invalid account type → redirects to create account 