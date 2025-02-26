import { configureStore } from "@reduxjs/toolkit";
import defaultOptionsReducer from "../features/defaultOptions/defaultOptionsSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    defaultOptions: defaultOptionsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
