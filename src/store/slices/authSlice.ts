import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: Record<string, unknown> | null;
  token: string | null;
  isTfaVerified: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isTfaVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ user: Record<string, unknown>; token: string }>
    ) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    verifyTfa(state) {
      state.isTfaVerified = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.isTfaVerified = false;
    },
  },
});

export const { loginSuccess, logout, verifyTfa } = authSlice.actions;
export default authSlice.reducer;
