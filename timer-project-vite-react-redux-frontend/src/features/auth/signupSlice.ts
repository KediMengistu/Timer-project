import { createSlice } from "@reduxjs/toolkit";
import { ApiErrorResponse, createAppAsyncThunk } from "../../app/appTypes";

// --- Types ---
export interface SignupState {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: ApiErrorResponse | null;
}

export interface SignUpDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface VerifySignUpDTO {
  email: string;
  password: string;
  inputVerificationCode: string;
}

export interface ReinitiateVerifySignUpDTO {
  email: string;
  verificationAction: string;
}

// --- Thunks ---
export const submitSignUp = createAppAsyncThunk<void, SignUpDTO>(
  "signup/submitSignup",
  async (signupDTO: SignUpDTO, thunkAPI) => {
    try {
      // Replaced `APP_URL` with `/api`
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(signupDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      return;
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

export const verifySignUp = createAppAsyncThunk<void, VerifySignUpDTO>(
  "signup/verifySignup",
  async (verifySignUpDTO: VerifySignUpDTO, thunkAPI) => {
    try {
      const response = await fetch("/api/auth/verify-signup", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(verifySignUpDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        timestamp: new Date().toISOString(),
        path: "/auth/verify-signup",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

export const reinitiateSignUpVerification = createAppAsyncThunk<
  void,
  ReinitiateVerifySignUpDTO
>(
  "signup/reinitiateVerification",
  async (reinitiateVerifySignUpDTO: ReinitiateVerifySignUpDTO, thunkAPI) => {
    try {
      const response = await fetch(
        "/api/verification/reinitiate-verification",
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(reinitiateVerifySignUpDTO),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        timestamp: new Date().toISOString(),
        path: "/verification/reinitiate-verification",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

// --- Slice ---
const initialState: SignupState = {
  status: "idle",
  error: null,
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    resetSignup: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(submitSignUp.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(submitSignUp.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(submitSignUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })

      .addCase(verifySignUp.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(verifySignUp.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(verifySignUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })

      .addCase(reinitiateSignUpVerification.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(reinitiateSignUpVerification.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(reinitiateSignUpVerification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      });
  },
});

export const { resetSignup } = signupSlice.actions;
export default signupSlice.reducer;
