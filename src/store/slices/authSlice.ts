import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: Record<string, unknown> | null;
  token: string | null;
  rememberMeToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  rememberMeToken: null,
  isAuthenticated: false,
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
    setRememberMeToken(state, action: PayloadAction<string>) {
      state.rememberMeToken = action.payload;
    },
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    clearRememberMeToken(state) {
      state.rememberMeToken = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.rememberMeToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, setToken, setRememberMeToken,setAuthenticated, clearRememberMeToken, logout } = authSlice.actions;
export default authSlice.reducer;
