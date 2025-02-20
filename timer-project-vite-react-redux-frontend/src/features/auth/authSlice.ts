import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  value: boolean;
}

const initialState = {
  value: false,
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleAuth: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleAuth } = authSlice.actions;

export default authSlice.reducer;
