import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk, DefaultState } from "../../app/appTypes";
import { normalize, schema } from "normalizr";

export interface TimerState extends DefaultState {
  allTimers: any;
}

export const timerEntity = new schema.Entity("timers");

export const retrieveAllTimers = createAppAsyncThunk<any, void>(
  "timer/retrieveAllTimers",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/api/timers/get-all-timers", {
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
      const normalized = normalize(data, [timerEntity]);
      return normalized.entities;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        timestamp: new Date().toISOString(),
        path: "/timers/get-all-timers",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

const timersAdapter = createEntityAdapter();

const initialState: TimerState = {
  status: "idle",
  allTimers: timersAdapter.getInitialState(),
  error: null,
};

export const timersSlice = createSlice({
  name: "timers",
  initialState,
  reducers: {
    resetTimersStatus: (state) => {
      state.status = "idle";
    },
    resetTimersError: (state) => {
      state.error = null;
    },
    resetTimers: (state) => {
      state.status = "idle";
      state.allTimers = timersAdapter.getInitialState();
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(retrieveAllTimers.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(retrieveAllTimers.fulfilled, (state, action) => {
        state.status = "succeeded";
        timersAdapter.upsertMany(state.allTimers, action.payload.timers);
      })
      .addCase(retrieveAllTimers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      });
  },
});

export const { resetTimersStatus, resetTimersError, resetTimers } =
  timersSlice.actions;
export default timersSlice.reducer;
