import { createSlice } from "@reduxjs/toolkit";
import {
  createAppAsyncThunk,
  DefaultState,
  ReinitiateVerificationDTO,
} from "../../app/appTypes";
import {
  ForgotPasswordDTO,
  VerifyForgotPasswordDTO,
  VerifyDeleteAccountDTO,
} from "./userDTO";

export interface UserState extends DefaultState {
  user: any;
}

export const submitForgotPassword = createAppAsyncThunk<
  void,
  ForgotPasswordDTO
>(
  "user/submitForgotPassword",
  async (forgotPasswordDTO: ForgotPasswordDTO, thunkAPI) => {
    try {
      const response = await fetch("/api/users/forgot-password-request", {
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
        path: "/user/forgot-password-request",
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
  "user/verifyForgotPassword",
  async (verifyForgotPasswordDTO: VerifyForgotPasswordDTO, thunkAPI) => {
    try {
      const response = await fetch("/api/users/forgot-password-confirm", {
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
        path: "/user/forgot-password-confirm",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

export const reinitiateForgotPasswordVerification = createAppAsyncThunk<
  void,
  ReinitiateVerificationDTO
>(
  "user/reinitiateVerification",
  async (reinitiateForgotPasswordDTO: ReinitiateVerificationDTO, thunkAPI) => {
    try {
      const response = await fetch(
        "/api/verification/reinitiate-verification",
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
        path: "/verification/reinitiate-verification",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

export const retrieveUser = createAppAsyncThunk<string, void>(
  "user/retrieveUser",
  async (_, thunkAPI) => {
    try {
      // Using a relative path: /api/users/retrieve-user-email
      const response = await fetch("/api/users/retrieve-user", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }

      const user = await response.json();
      return user;
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

export const submitDeleteAccount = createAppAsyncThunk<void, void>(
  "deleteAccount/submitDeleteAccount",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/api/users/delete-user-request", {
        method: "PATCH",
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        timestamp: new Date().toISOString(),
        path: "/users/delete-user-request",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

export const verifyDeleteAccount = createAppAsyncThunk<
  void,
  VerifyDeleteAccountDTO
>(
  "deleteAccount/verifyDeleteAccount",
  async (verifyDeleteAccountDTO: VerifyDeleteAccountDTO, thunkAPI) => {
    try {
      const response = await fetch("/api/users/delete-user-confirm", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(verifyDeleteAccountDTO),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        timestamp: new Date().toISOString(),
        path: "/users/delete-user-confirm",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

export const reinitiateDeleteAccountVerification = createAppAsyncThunk<
  void,
  ReinitiateVerificationDTO
>(
  "deleteAccount/reinitiateVerification",
  async (reinitiateDeleteAccountDTO: ReinitiateVerificationDTO, thunkAPI) => {
    try {
      const response = await fetch(
        "/api/verification/reinitiate-verification",
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(reinitiateDeleteAccountDTO),
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

const initialState: UserState = {
  status: "idle",
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserStatus: (state) => {
      state.status = "idle";
    },
    resetUserError: (state) => {
      state.error = null;
    },
    resetUser: (state) => {
      state.status = "idle";
      state.user = null;
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
      .addCase(reinitiateForgotPasswordVerification.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(reinitiateForgotPasswordVerification.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(
        reinitiateForgotPasswordVerification.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload || null;
        },
      )
      .addCase(retrieveUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(retrieveUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(retrieveUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })
      .addCase(submitDeleteAccount.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(submitDeleteAccount.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(submitDeleteAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })
      .addCase(verifyDeleteAccount.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(verifyDeleteAccount.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(verifyDeleteAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })
      .addCase(reinitiateDeleteAccountVerification.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(reinitiateDeleteAccountVerification.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(
        reinitiateDeleteAccountVerification.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload || null;
        },
      );
  },
});

export const { resetUserStatus, resetUserError, resetUser } = userSlice.actions;
export default userSlice.reducer;
