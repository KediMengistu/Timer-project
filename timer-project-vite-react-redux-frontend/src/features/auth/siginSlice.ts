import { createSlice } from "@reduxjs/toolkit";
import { ApiErrorResponse, createAppAsyncThunk } from "../../app/appTypes";

// --- Types ---
export interface SigninState {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: ApiErrorResponse | null;
}

export interface SignInDTO {
  email: string;
  password: string;
}

export interface VerifySignInDTO {
  email: string;
  password: string;
  inputVerificationCode: string;
}

export interface ReinitiateVerifySignInDTO {
  email: string;
  verificationAction: string;
}

// --- Thunks ---
export const submitSignIn = createAppAsyncThunk<void, SignInDTO>(
  "signin/submitSignin",
  async (signinDTO: SignInDTO, thunkAPI) => {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(signinDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        timestamp: new Date().toISOString(),
        path: "/auth/signin",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

export const verifySignIn = createAppAsyncThunk<void, VerifySignInDTO>(
  "signin/verifySignin",
  async (verifySignInDTO: VerifySignInDTO, thunkAPI) => {
    try {
      // Original code calls "/auth/verify-signup" — leaving as-is
      const response = await fetch("/api/auth/verify-signup", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(verifySignInDTO),
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

export const reinitiateSignInVerification = createAppAsyncThunk<
  void,
  ReinitiateVerifySignInDTO
>(
  "signin/reinitiateVerification",
  async (reinitiateVerifySignInDTO: ReinitiateVerifySignInDTO, thunkAPI) => {
    try {
      const response = await fetch(
        "/api/verification/reinitiate-verification",
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(reinitiateVerifySignInDTO),
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
const initialState: SigninState = {
  status: "idle",
  error: null,
};

export const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    resetSignin: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(submitSignIn.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(submitSignIn.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(submitSignIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })

      .addCase(verifySignIn.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(verifySignIn.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(verifySignIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })

      .addCase(reinitiateSignInVerification.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(reinitiateSignInVerification.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(reinitiateSignInVerification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      });
  },
});

export const { resetSignin } = signinSlice.actions;
export default signinSlice.reducer;
