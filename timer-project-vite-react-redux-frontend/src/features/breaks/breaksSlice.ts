import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createAppAsyncThunk, DefaultState } from "../../app/appTypes";
import { BreaksForTimer } from "./breakDTO";
import { deleteTimer, retrieveAllTimers } from "../timers/timersSlice";

export interface BreaksState
  extends DefaultState,
    EntityState<BreaksForTimer, string> {
  fetchBreaks: boolean;
}

export const retrieveAllBreaks = createAppAsyncThunk<BreaksForTimer, string>(
  "breaks/retrieveAllBreaks",
  async (timerId: string, thunkAPI) => {
    try {
      const response = await fetch(`/api/breaks/get-all-breaks/${timerId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

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
      return thunkAPI.rejectWithValue({
        timestamp: new Date().toISOString(),
        path: `/breaks/get-all-breaks/${timerId}`,
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
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
        breaksAdapter.addOne(state, action.payload);
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
