import { configureStore } from "@reduxjs/toolkit";
import expandedViewReducer from "../features/expandedView/expandedViewSlice";

export const store = configureStore({
  reducer: {
    expandedView: expandedViewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
