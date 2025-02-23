import { createSlice } from "@reduxjs/toolkit";

export interface RegisterState {
  value: boolean;
}

const initialState = {
  value: false,
} as RegisterState;

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    toggleRegister: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleRegister } = registerSlice.actions;

export default registerSlice.reducer;
