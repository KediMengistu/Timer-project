import { createSlice } from "@reduxjs/toolkit";
import APP_URL from "../../utils/server/server-info";
import { createAppAsyncThunk } from "../../app/appTypes";

export interface SignupState {
  userId: string | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

export interface SignUpDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const submitSignUp = createAppAsyncThunk<{ userId: string }, SignUpDTO>(
  "signup/submitSignup",
  async (signupDTO: SignUpDTO, thunkAPI) => {
    try {
      const response = await fetch(`${APP_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(signupDTO),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        timestamp: new Date().toISOString(),
        path: "/auth/signup",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

const initialState = {
  userId: null,
  status: "idle",
  error: null,
} as SignupState;

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(submitSignUp.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(submitSignUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userId = action.payload.userId;
        state.error = null;
      })
      .addCase(submitSignUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Unknown Error";
      });
  },
});

export default signupSlice.reducer;
