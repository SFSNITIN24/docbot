import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: Record<string, unknown> | null;
  token: string | null;
  isTfaVerified: boolean;
}

const initialState: AuthState = {
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
      action: PayloadAction<{ user: Record<string, unknown> }>
    ) {
      state.user = action.payload.user;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    verifyTfa(state) {
      state.isTfaVerified = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isTfaVerified = false;
    },
  },
});

export const { loginSuccess, setToken,logout, verifyTfa } = authSlice.actions;
export default authSlice.reducer;
