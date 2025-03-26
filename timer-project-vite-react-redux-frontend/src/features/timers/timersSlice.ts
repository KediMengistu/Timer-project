import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { createAppAsyncThunk, DefaultState } from "../../app/appTypes";
import { Timer } from "./timerDTO";

export interface TimerState extends DefaultState, EntityState<Timer, string> {}

/*
  TimerState = {
    status: "idle" | "pending" | "succeeded" | "failed";
    ids: [];
    entities: {
      id: {},
      id: {},
      id: {}
    }
    error: ApiErrorResponse | null;
  }
*/

export const retrieveAllTimers = createAppAsyncThunk<Timer[], void>(
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
      return data;
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

const timersAdapter = createEntityAdapter<Timer>();

const initialState: TimerState = timersAdapter.getInitialState({
  status: "idle",
  error: null,
});

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
      state.ids = timersAdapter.getInitialState().ids;
      state.entities = timersAdapter.getInitialState().entities;
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
        timersAdapter.setAll(state, action.payload);
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
