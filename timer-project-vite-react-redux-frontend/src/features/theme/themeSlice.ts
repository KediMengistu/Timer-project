import { createSlice } from "@reduxjs/toolkit";

export interface themeState {
  darkMode: boolean;
}

const initialState = {
  darkMode:
    localStorage.getItem("theme") !== null
      ? localStorage.getItem("theme")
      : false && localStorage.setItem("theme", "dark"),
} as themeState;

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
