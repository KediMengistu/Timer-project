import { configureStore } from "@reduxjs/toolkit";
import defaultOptionsReducer from "../features/defaultOptions/defaultOptionsSlice";

export const store = configureStore({
  reducer: {
    defaultOptions: defaultOptionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
