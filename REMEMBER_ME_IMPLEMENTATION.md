# Remember Me Functionality Implementation

## Overview
This implementation provides a 30-day "Remember Me" functionality that allows users to stay logged in across browser sessions. The backend handles token expiration and validation.

## Features

### 1. Login Flow
- User enters credentials and checks "Remember for 30 days"
- Backend receives `remember_me: true` in the login payload
- After successful OTP verification, backend provides a `rememberMeToken`

### 2. Token Management
- **Regular Token**: Short-lived token for immediate authentication
- **Remember Me Token**: 30-day token stored in Redux (backend handles expiration)
- **Auto-login**: Users are automatically logged in if remember me token exists

### 3. Token Validation
- Backend validates token expiration and returns 401 for expired tokens
- Frontend interceptor handles 401 responses by clearing tokens and redirecting to login
- No frontend expiration logic - backend is the source of truth

## Implementation Details

### Auth Slice (`src/store/slices/authSlice.ts`)
```typescript
interface AuthState {
  user: Record<string, unknown> | null;
  token: string | null;
  rememberMeToken: string | null;
}
```

### API Interceptor (`src/service/interceptor.tsx`)
- Uses regular token if available
- Falls back to remember me token if regular token is missing
- Handles 401 responses by clearing all tokens and redirecting to login

### Auto-login Hook (`src/hooks/useAutoLogin.ts`)
- Checks for remember me token on app startup
- Automatically redirects to dashboard if token exists
- Backend will validate token and return 401 if expired

### Token Status Info (`src/components/TokenExpiryInfo.tsx`)
- Shows "Remember me is active" when token exists
- No frontend expiry calculation - backend handles validation

## Backend Requirements

The backend should:

1. **Login Endpoint** (`/auth/login`)
   - Accept `remember_me: boolean` in payload
   - Return user data and temporary token

2. **2FA Verification Endpoint** (`/auth/2fa/verify`)
   - Return `rememberMeToken` if remember_me was true during login
   - Token should be valid for 30 days (backend handles expiration)

3. **Token Validation**
   - Validate both regular and remember me tokens
   - Return 401 for expired/invalid tokens
   - Handle token expiration on the server side

## Usage

### For Users
1. Login with credentials
2. Check "Remember for 30 days"
3. Complete 2FA verification
4. Stay logged in for 30 days across browser sessions

### For Developers
```typescript
const { isChecking } = useAutoLogin();

import { handleLogout } from '../utils/authUtils';
handleLogout(true); 
```

## Security Considerations

1. **Token Storage**: Remember me tokens are stored in Redux with persistence
2. **Backend Validation**: All token expiration is handled by the backend
3. **Auto-cleanup**: Expired tokens are automatically cleared on 401 responses
4. **Manual Logout**: Users can manually logout to clear all tokens

## File Structure
```
src/
├── store/slices/authSlice.ts          # Auth state management
├── service/interceptor.tsx            # API interceptor with token handling
├── hooks/useAutoLogin.ts             # Auto-login functionality
├── utils/authUtils.ts                # Auth utility functions
├── components/TokenExpiryInfo.tsx    # Token status display
└── pages/public/auth/
    ├── login/index.tsx               # Login with remember me
    └── verification/index.tsx        # 2FA with remember me token
```

## Key Changes from Previous Version

- ✅ Removed frontend token expiry logic
- ✅ Backend handles all token validation and expiration
- ✅ Simplified state management (no expiry timestamps)
- ✅ Cleaner interceptor logic
- ✅ More secure approach (backend as source of truth) 