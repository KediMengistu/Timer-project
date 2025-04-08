import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import themeReducer from "../features/theme/themeSlice";
import timeReducer from "../features/time/timeSlice";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import timersReducer from "../features/timers/timersSlice";
import breaksReducer from "../features/breaks/breaksSlice";
const rootReducer = combineReducers({
  theme: themeReducer,
  time: timeReducer,
  auth: authReducer,
  user: userReducer,
  timers: timersReducer,
  breaks: breaksReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { createAppAsyncThunk, type AppThunk } from "./appTypes";
