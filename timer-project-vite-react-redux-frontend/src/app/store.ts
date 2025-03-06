import { configureStore } from "@reduxjs/toolkit";
import themeReducer, { fetchAndSetTheme } from "../features/theme/themeSlice";
import timeReducer, { fetchAndSetTimezone } from "../features/time/timeSlice";
import signupReducer from "../features/auth/signupSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    time: timeReducer,
    signup: signupReducer,
  },
});

store.dispatch(fetchAndSetTheme());
store.dispatch(fetchAndSetTimezone());

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { createAppAsyncThunk, type AppThunk } from "./appTypes";
