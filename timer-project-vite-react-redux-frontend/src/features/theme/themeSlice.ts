import { createSlice } from "@reduxjs/toolkit";

export interface themeState {
  value: boolean;
}

const initialState = {
  value: false,
} as themeState;

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
