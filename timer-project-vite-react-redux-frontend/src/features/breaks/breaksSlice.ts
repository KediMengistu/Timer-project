import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createAppAsyncThunk, DefaultState } from "../../app/appTypes";
import { BreaksForTimer } from "./breakDTO";
import { deleteTimer, retrieveAllTimers } from "../timers/timersSlice";
import { extractLocalStorageStoreExists } from "../../utils/functions/extractLocalStorageStoreExists";
import APP_URL from "../../utils/server/server-info";

export interface BreaksState
  extends DefaultState,
    EntityState<BreaksForTimer, string> {
  fetchBreaks: boolean;
}

// Helper function to create a standard error response
const createErrorResponse = (
  path: string,
  message: string,
  statusCode: number,
) => ({
  timestamp: new Date().toISOString(),
  path,
  message,
  statusCode,
});

export const retrieveAllBreaks = createAppAsyncThunk<BreaksForTimer, string>(
  "breaks/retrieveAllBreaks",
  async (timerId: string, thunkAPI) => {
    if (!extractLocalStorageStoreExists)
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          `/breaks/get-all-breaks/${timerId}`,
          "Required data not available.",
          400,
        ),
      );

    try {
      const response = await fetch(
        `${APP_URL}/breaks/get-all-breaks/${timerId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      const result: BreaksForTimer = {
        id: timerId,
        breaks: data,
      };
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          `/breaks/get-all-breaks/${timerId}`,
          error instanceof Error ? error.message : "Network error occurred",
          500,
        ),
      );
    }
  },
);

const breaksAdapter = createEntityAdapter<BreaksForTimer>();

const initialState: BreaksState = breaksAdapter.getInitialState({
  status: "idle",
  fetchBreaks: false,
  error: null,
});

export const breaksSlice = createSlice({
  name: "breaks",
  initialState,
  reducers: {
    setFetchBreaks: (state, action: PayloadAction<boolean>) => {
      state.fetchBreaks = action.payload;
    },
    resetBreaksStatus: (state) => {
      state.status = "idle";
    },
    resetBreaksError: (state) => {
      state.error = null;
    },
    resetBreaks: (state) => {
      state.status = "idle";
      state.fetchBreaks = false;
      state.ids = breaksAdapter.getInitialState().ids;
      state.entities = breaksAdapter.getInitialState().entities;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(retrieveAllBreaks.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(retrieveAllBreaks.fulfilled, (state, action) => {
        state.status = "succeeded";
        breaksAdapter.upsertOne(state, action.payload);
      })
      .addCase(retrieveAllBreaks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })
      .addCase(retrieveAllTimers.fulfilled, (state) => {
        state.fetchBreaks = true;
      })
      .addCase(deleteTimer.fulfilled, (state, action) => {
        breaksAdapter.removeOne(state, action.payload);
      });
  },
});

export const {
  setFetchBreaks,
  resetBreaksStatus,
  resetBreaksError,
  resetBreaks,
} = breaksSlice.actions;
export default breaksSlice.reducer;
