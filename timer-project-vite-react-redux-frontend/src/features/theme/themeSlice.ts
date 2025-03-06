import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";

export interface ThemeState {
  darkMode: boolean;
}

export const fetchAndSetTheme = (): AppThunk => {
  return (dispatch, getState) => {
    //holder variable stores initial value for theme state upon application start - false (indicates light theme).
    let currentThemeState: boolean = getState().theme.darkMode;

    //localStorage contains theme key.
    if (localStorage.getItem("theme") !== null) {
      localStorage.getItem("theme") === "light"
        ? (currentThemeState = false)
        : (currentThemeState = true);
    }
    //localStorage does not contain theme key.
    else {
      localStorage.setItem("theme", "light");
    }

    //set the initial value for theme to be false in case of no theme key in localStorage or the current stored value in localStorage.
    dispatch(setTheme(currentThemeState));
  };
};

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
