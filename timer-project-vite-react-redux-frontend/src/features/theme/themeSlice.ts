import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  darkMode: boolean;
}

const initialState = {
  darkMode: false,
} as ThemeState;

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
