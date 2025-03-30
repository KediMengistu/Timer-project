import { configureStore } from "@reduxjs/toolkit";
import themeReducer, { fetchAndSetTheme } from "../features/theme/themeSlice";
import timeReducer, { fetchAndSetTimezone } from "../features/time/timeSlice";
import authReducer, { fetchAndSetIsSignedIn } from "../features/auth/authSlice";
import userReducer, { fetchAndSetUser } from "../features/user/userSlice";
import timersReducer, {
  fetchAndSetTimers,
} from "../features/timers/timersSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    time: timeReducer,
    auth: authReducer,
    user: userReducer,
    timers: timersReducer,
  },
});

store.dispatch(fetchAndSetTheme());
store.dispatch(fetchAndSetTimezone());
store.dispatch(fetchAndSetIsSignedIn());
store.dispatch(fetchAndSetUser());
store.dispatch(fetchAndSetTimers());

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { createAppAsyncThunk, type AppThunk } from "./appTypes";
