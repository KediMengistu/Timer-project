import { configureStore } from "@reduxjs/toolkit";
import themeReducer, { fetchAndSetTheme } from "../features/theme/themeSlice";
import timeReducer, { fetchAndSetTimezone } from "../features/time/timeSlice";
import signupReducer from "../features/auth/signupSlice";
import signedInStatusReducer, {
  fetchAndSetSignedInStatus,
} from "../features/auth/signedinStatusSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    time: timeReducer,
    signup: signupReducer,
    signedInStatus: signedInStatusReducer,
  },
});

store.dispatch(fetchAndSetTheme());
store.dispatch(fetchAndSetTimezone());
store.dispatch(fetchAndSetSignedInStatus());

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { createAppAsyncThunk, type AppThunk } from "./appTypes";
