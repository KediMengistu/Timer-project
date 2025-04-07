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
  User,
} from "./userDTO";
import {
  createTimer,
  deleteTimer,
  pauseTimer,
  playTimer,
  restartTimer,
} from "../timers/timersSlice";
import { extractLocalStorageStoreExists } from "../../utils/functions/extractLocalStorageStoreExists";

export interface UserState extends DefaultState {
  user: User | null;
  updateUser: boolean;
}

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

export const submitForgotPassword = createAppAsyncThunk<
  void,
  ForgotPasswordDTO
>(
  "user/submitForgotPassword",
  async (forgotPasswordDTO: ForgotPasswordDTO, thunkAPI) => {
    if (!extractLocalStorageStoreExists)
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/user/forgot-password-request",
          "Required data not available.",
          400,
        ),
      );

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
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/user/forgot-password-request",
          error instanceof Error ? error.message : "Network error occurred",
          500,
        ),
      );
    }
  },
);

export const verifyForgotPassword = createAppAsyncThunk<
  void,
  VerifyForgotPasswordDTO
>(
  "user/verifyForgotPassword",
  async (verifyForgotPasswordDTO: VerifyForgotPasswordDTO, thunkAPI) => {
    if (!extractLocalStorageStoreExists)
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/user/forgot-password-confirm",
          "Required data not available.",
          400,
        ),
      );

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
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/user/forgot-password-confirm",
          error instanceof Error ? error.message : "Network error occurred",
          500,
        ),
      );
    }
  },
);

export const reinitiateForgotPasswordVerification = createAppAsyncThunk<
  void,
  ReinitiateVerificationDTO
>(
  "user/reinitiateVerification",
  async (reinitiateForgotPasswordDTO: ReinitiateVerificationDTO, thunkAPI) => {
    if (!extractLocalStorageStoreExists)
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/verification/reinitiate-verification",
          "Required data not available.",
          400,
        ),
      );

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
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/verification/reinitiate-verification",
          error instanceof Error ? error.message : "Network error occurred",
          500,
        ),
      );
    }
  },
);

export const retrieveUser = createAppAsyncThunk<User, void>(
  "user/retrieveUser",
  async (_, thunkAPI) => {
    if (!extractLocalStorageStoreExists)
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/users/retrieve-user",
          "Required data not available.",
          400,
        ),
      );

    try {
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
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/users/retrieve-user-email",
          error instanceof Error ? error.message : "Network error occurred",
          500,
        ),
      );
    }
  },
);

export const submitDeleteAccount = createAppAsyncThunk<void, void>(
  "deleteAccount/submitDeleteAccount",
  async (_, thunkAPI) => {
    if (!extractLocalStorageStoreExists)
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/users/delete-user-request",
          "Required data not available.",
          400,
        ),
      );

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
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/users/delete-user-request",
          error instanceof Error ? error.message : "Network error occurred",
          500,
        ),
      );
    }
  },
);

export const verifyDeleteAccount = createAppAsyncThunk<
  void,
  VerifyDeleteAccountDTO
>(
  "deleteAccount/verifyDeleteAccount",
  async (verifyDeleteAccountDTO: VerifyDeleteAccountDTO, thunkAPI) => {
    if (!extractLocalStorageStoreExists)
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/users/delete-user-confirm",
          "Required data not available.",
          400,
        ),
      );

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
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/users/delete-user-confirm",
          error instanceof Error ? error.message : "Network error occurred",
          500,
        ),
      );
    }
  },
);

export const reinitiateDeleteAccountVerification = createAppAsyncThunk<
  void,
  ReinitiateVerificationDTO
>(
  "deleteAccount/reinitiateVerification",
  async (reinitiateDeleteAccountDTO: ReinitiateVerificationDTO, thunkAPI) => {
    if (!extractLocalStorageStoreExists)
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/verification/reinitiate-verification",
          "Required data not available.",
          400,
        ),
      );

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
      return thunkAPI.rejectWithValue(
        createErrorResponse(
          "/verification/reinitiate-verification",
          error instanceof Error ? error.message : "Network error occurred",
          500,
        ),
      );
    }
  },
);

const initialState: UserState = {
  status: "idle",
  user: null,
  updateUser: false,
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
    resetUpdateUser: (state) => {
      state.updateUser = false;
    },
    resetUser: (state) => {
      state.status = "idle";
      state.user = null;
      state.updateUser = false;
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
      )
      .addCase(createTimer.fulfilled, (state) => {
        state.updateUser = true;
      })
      .addCase(deleteTimer.fulfilled, (state) => {
        state.updateUser = true;
      })
      .addCase(pauseTimer.fulfilled, (state) => {
        state.updateUser = true;
      })
      .addCase(playTimer.fulfilled, (state) => {
        state.updateUser = true;
      })
      .addCase(restartTimer.fulfilled, (state) => {
        state.updateUser = true;
      });
  },
});

export const { resetUserStatus, resetUserError, resetUpdateUser, resetUser } =
  userSlice.actions;
export default userSlice.reducer;
