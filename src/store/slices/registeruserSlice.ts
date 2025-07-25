
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RegisterUserState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const initialState: RegisterUserState = {};

export const registeruserSlice = createSlice({
  name: "registeruser",
  initialState,
  reducers: {
    updateRegisterData: (
      state,
      action: PayloadAction<Partial<RegisterUserState>>
    ) => {
      Object.assign(state, action.payload);
    },
    resetRegisterUser: (state) => {
      Object.keys(state).forEach((key) => {
        delete state[key];
      });
    },
  },
});

export const { updateRegisterData, resetRegisterUser } = registeruserSlice.actions;

export default registeruserSlice.reducer;
