import { createSlice } from "@reduxjs/toolkit";
import { ApiErrorResponse, createAppAsyncThunk } from "../../app/appTypes";

// --- Types ---
export interface DeleteAccountState {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: ApiErrorResponse | null;
}

export interface VerifyDeleteAccountDTO {
  inputVerificationCode: string;
}

export interface ReinitiateDeleteAccountDTO {
  email: string;
  verificationAction: string;
}

// --- Thunks ---
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
  ReinitiateDeleteAccountDTO
>(
  "deleteAccount/reinitiateVerification",
  async (reinitiateDeleteAccountDTO: ReinitiateDeleteAccountDTO, thunkAPI) => {
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

// --- Slice ---
const initialState: DeleteAccountState = {
  status: "idle",
  error: null,
};

export const deleteAccountSlice = createSlice({
  name: "deleteAccount",
  initialState,
  reducers: {
    resetDeleteAccount: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
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

export const { resetDeleteAccount } = deleteAccountSlice.actions;
export default deleteAccountSlice.reducer;
