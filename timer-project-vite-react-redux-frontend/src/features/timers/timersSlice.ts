import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createAppAsyncThunk, DefaultState } from "../../app/appTypes";
import { CreateTimerDTO, TimeDurationDTO, Timer } from "./timerDTO";
import { extractLocalStorageStoreExists } from "../../utils/functions/extractLocalStorageStoreExists";

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

export const retrieveAllTimers = createAppAsyncThunk<Timer[], void>(
  "timers/retrieveAllTimers",
  async (_, thunkAPI) => {
    if (!extractLocalStorageStoreExists)
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/timers/get-all-timers",
          "Required data not available.",
          400,
        ),
      );

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
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/timers/get-all-timers",
          error instanceof Error ? error.message : "Network error occurred",
          500,
        ),
      );
    }
  },
);

export const createTimer = createAppAsyncThunk<Timer, CreateTimerDTO>(
  "timers/createTimer",
  async (createTimerDTO: CreateTimerDTO, thunkAPI) => {
    if (!extractLocalStorageStoreExists)
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/timers/create-timer",
          "Required data not available.",
          400,
        ),
      );

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
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/timers/create-timer",
          error instanceof Error ? error.message : "Network error occurred",
          500,
        ),
      );
    }
  },
);

export const deleteTimer = createAppAsyncThunk<string, string>(
  "timers/deleteTimer",
  async (timerId: string, thunkAPI) => {
    if (!extractLocalStorageStoreExists)
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          `/timers/delete-timer/${timerId}`,
          "Required data not available.",
          400,
        ),
      );

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
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          `/timers/delete-timer/${timerId}`,
          error instanceof Error ? error.message : "Network error occurred",
          500,
        ),
      );
    }
  },
);

export const pauseTimer = createAppAsyncThunk<Timer, string>(
  "timers/pauseTimer",
  async (timerId: string, thunkAPI) => {
    if (!extractLocalStorageStoreExists)
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          `/timers/pause-timer/${timerId}`,
          "Required data not available.",
          400,
        ),
      );

    try {
      const response = await fetch(`/api/timers/pause-timer/${timerId}`, {
        method: "PATCH",
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
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          `/timers/pause-timer/${timerId}`,
          error instanceof Error ? error.message : "Network error occurred",
          500,
        ),
      );
    }
  },
);

export const playTimer = createAppAsyncThunk<Timer, string>(
  "timers/playTimer",
  async (timerId: string, thunkAPI) => {
    if (!extractLocalStorageStoreExists)
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          `/timers/play-timer/${timerId}`,
          "Required data not available.",
          400,
        ),
      );

    try {
      const response = await fetch(`/api/timers/play-timer/${timerId}`, {
        method: "PATCH",
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
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          `/timers/play-timer/${timerId}`,
          error instanceof Error ? error.message : "Network error occurred",
          500,
        ),
      );
    }
  },
);

export const restartTimer = createAppAsyncThunk<Timer, string>(
  "timers/restartTimer",
  async (timerId: string, thunkAPI) => {
    if (!extractLocalStorageStoreExists)
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          `/timers/restart-timer/${timerId}`,
          "Required data not available.",
          400,
        ),
      );

    try {
      const response = await fetch(`/api/timers/restart-timer/${timerId}`, {
        method: "PATCH",
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
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          `/timers/restart-timer/${timerId}`,
          error instanceof Error ? error.message : "Network error occurred",
          500,
        ),
      );
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
    setReferenceTime: (state, action: PayloadAction<TimeDurationDTO>) => {
      timersAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          referenceTime: action.payload.timeDuration,
        },
      });
    },
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
      })
      .addCase(restartTimer.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(restartTimer.fulfilled, (state, action) => {
        state.status = "succeeded";
        timersAdapter.setOne(state, action.payload);
        state.error = null;
      })
      .addCase(restartTimer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      });
  },
});

export const {
  setReferenceTime,
  resetTimersStatus,
  resetTimersError,
  resetTimers,
} = timersSlice.actions;
export default timersSlice.reducer;
