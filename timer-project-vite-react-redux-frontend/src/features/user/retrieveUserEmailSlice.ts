import { createSlice } from "@reduxjs/toolkit";
import { ApiErrorResponse, createAppAsyncThunk } from "../../app/appTypes";

// --- Types ---
export interface RetrieveUserEmailState {
  status: "idle" | "pending" | "succeeded" | "failed";
  email: string | null;
  error: ApiErrorResponse | null;
}

// --- Thunk ---
export const retrieveUserEmail = createAppAsyncThunk<string, void>(
  "retrieveUserEmail/retrieveUserEmail",
  async (_, thunkAPI) => {
    try {
      // Using a relative path: /api/users/retrieve-user-email
      const response = await fetch("/api/users/retrieve-user-email", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }

      const email = await response.text();
      return email;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        timestamp: new Date().toISOString(),
        path: "/users/retrieve-user-email",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

// --- Slice ---
const initialState: RetrieveUserEmailState = {
  status: "idle",
  email: null,
  error: null,
};

export const retrieveUserEmailSlice = createSlice({
  name: "userEmail",
  initialState,
  reducers: {
    resetUserEmail: (state) => {
      state.status = "idle";
      state.email = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(retrieveUserEmail.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(retrieveUserEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.email = action.payload;
        state.error = null;
      })
      .addCase(retrieveUserEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      });
  },
});

export const { resetUserEmail } = retrieveUserEmailSlice.actions;
export default retrieveUserEmailSlice.reducer;
