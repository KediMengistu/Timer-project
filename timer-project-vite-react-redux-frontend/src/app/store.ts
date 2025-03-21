import { configureStore } from "@reduxjs/toolkit";
import themeReducer, { fetchAndSetTheme } from "../features/theme/themeSlice";
import timeReducer, { fetchAndSetTimezone } from "../features/time/timeSlice";
import authReducer, { fetchAndSetIsSignedIn } from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    time: timeReducer,
    auth: authReducer,
    user: userReducer,
  },
});

store.dispatch(fetchAndSetTheme());
store.dispatch(fetchAndSetTimezone());
store.dispatch(fetchAndSetIsSignedIn());

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { createAppAsyncThunk, type AppThunk } from "./appTypes";
