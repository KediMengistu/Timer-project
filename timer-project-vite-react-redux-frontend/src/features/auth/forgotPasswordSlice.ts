import { createSlice } from "@reduxjs/toolkit";
import APP_URL from "../../utils/server/server-info";
import { ApiErrorResponse, createAppAsyncThunk } from "../../app/appTypes";

export interface ForgotPasswordState {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: ApiErrorResponse | null;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface VerifyForgotPasswordDTO {
  email: string;
  inputVerificationCode: string;
  newPassword: string;
}

export interface ReinitiateForgotPasswordDTO {
  email: string;
  verificationAction: string;
}

export const submitForgotPassword = createAppAsyncThunk<
  void,
  ForgotPasswordDTO
>(
  "forgotPassword/submitForgotPassword",
  async (forgotPasswordDTO: ForgotPasswordDTO, thunkAPI) => {
    try {
      const response = await fetch(`${APP_URL}/auth/forgot-password-request`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(forgotPasswordDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        timestamp: new Date().toISOString(),
        path: "/auth/forgot-password-request",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

export const verifyForgotPassword = createAppAsyncThunk<
  void,
  VerifyForgotPasswordDTO
>(
  "forgotPassword/verifyForgotPassword",
  async (verifyForgotPasswordDTO: VerifyForgotPasswordDTO, thunkAPI) => {
    try {
      const response = await fetch(`${APP_URL}/auth/forgot-password-confirm`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(verifyForgotPasswordDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        timestamp: new Date().toISOString(),
        path: "/auth/forgot-password-confirm",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

export const reiniateForgotPasswordVerification = createAppAsyncThunk<
  void,
  ReinitiateForgotPasswordDTO
>(
  "forgotPassword/reiniateVerification",
  async (
    reinitiateForgotPasswordDTO: ReinitiateForgotPasswordDTO,
    thunkAPI,
  ) => {
    try {
      const response = await fetch(
        `${APP_URL}/verification/reiniate-verification`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(reinitiateForgotPasswordDTO),
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
        path: "/verification/reiniate-verification",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

const initialState = {
  status: "idle",
  error: null,
} as ForgotPasswordState;

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    resetForgotPassword: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(submitForgotPassword.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(submitForgotPassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(submitForgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })
      .addCase(verifyForgotPassword.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(verifyForgotPassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(verifyForgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })
      .addCase(reiniateForgotPasswordVerification.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(reiniateForgotPasswordVerification.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(reiniateForgotPasswordVerification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      });
  },
});

export const { resetForgotPassword } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
