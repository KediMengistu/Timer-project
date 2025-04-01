import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { createAppAsyncThunk, DefaultState } from "../../app/appTypes";
import {
  CreateTimerDTO,
  PausePlayTimerDTO,
  PauseTimerDTO,
  PlayTimerDTO,
  Timer,
} from "./timerDTO";

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
  "timers/retrieveAllTimers",
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

export const createTimer = createAppAsyncThunk<Timer, CreateTimerDTO>(
  "timers/createTimer",
  async (createTimerDTO: CreateTimerDTO, thunkAPI) => {
    try {
      const response = await fetch("/api/timers/create-timer", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(createTimerDTO),
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
        path: "/timers/create-timer",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

export const deleteTimer = createAppAsyncThunk<string, string>(
  "timers/deleteTimer",
  async (timerId: string, thunkAPI) => {
    try {
      const response = await fetch(`/api/timers/delete-timer/${timerId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }

      return timerId;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        timestamp: new Date().toISOString(),
        path: `/timers/delete-timer/${timerId}`,
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

export const pauseTimer = createAppAsyncThunk<Timer, PausePlayTimerDTO>(
  "timers/pauseTimer",
  async (pausePlayTimerDTO: PausePlayTimerDTO, thunkAPI) => {
    const timerId: string = pausePlayTimerDTO.timerId;
    const pauseTimerDTO: PauseTimerDTO = {
      pauseTime: pausePlayTimerDTO.pausePlayTime,
    };
    try {
      const response = await fetch(`/api/timers/pause-timer/${timerId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(pauseTimerDTO),
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
        path: `/timers/pause-timer/${timerId}`,
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

export const playTimer = createAppAsyncThunk<Timer, PausePlayTimerDTO>(
  "timers/playTimer",
  async (pausePlayTimerDTO: PausePlayTimerDTO, thunkAPI) => {
    const timerId: string = pausePlayTimerDTO.timerId;
    const playTimerDTO: PlayTimerDTO = {
      playTime: pausePlayTimerDTO.pausePlayTime,
    };
    try {
      const response = await fetch(`/api/timers/play-timer/${timerId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(playTimerDTO),
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
        path: `/timers/play-timer/${timerId}`,
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
      })
      .addCase(createTimer.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(createTimer.fulfilled, (state, action) => {
        state.status = "succeeded";
        timersAdapter.addOne(state, action.payload);
        state.error = null;
      })
      .addCase(createTimer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })
      .addCase(deleteTimer.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(deleteTimer.fulfilled, (state, action) => {
        state.status = "succeeded";
        timersAdapter.removeOne(state, action.payload);
        state.error = null;
      })
      .addCase(deleteTimer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })
      .addCase(pauseTimer.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(pauseTimer.fulfilled, (state, action) => {
        state.status = "succeeded";
        timersAdapter.upsertOne(state, action.payload);
        state.error = null;
      })
      .addCase(pauseTimer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })
      .addCase(playTimer.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(playTimer.fulfilled, (state, action) => {
        state.status = "succeeded";
        timersAdapter.upsertOne(state, action.payload);
        state.error = null;
      })
      .addCase(playTimer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      });
  },
});

export const { resetTimersStatus, resetTimersError, resetTimers } =
  timersSlice.actions;
export default timersSlice.reducer;
