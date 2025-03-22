import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import {
  createAppAsyncThunk,
  DefaultState,
  ReinitiateVerificationDTO,
} from "../../app/appTypes";
import { SignInDTO, SignUpDTO, VerifyAccountDTO } from "./authDTO";

export interface AuthState extends DefaultState {
  isSignedIn: boolean;
}

export const fetchAndSetIsSignedIn = (): AppThunk => {
  return (dispatch, getState) => {
    let isSignedIn: boolean = getState().auth.isSignedIn;
    if (localStorage.getItem("signedInStatus") !== null) {
      if (localStorage.getItem("signedInStatus") === "not signed in") {
        localStorage.removeItem("signedInStatus");
      }
      if (localStorage.getItem("signedInStatus") === "signed in") {
        isSignedIn = true;
      }
    }
    if (isSignedIn !== false) {
      dispatch(setIsSignedIn(isSignedIn));
    }
  };
};

export const submitSignUp = createAppAsyncThunk<void, SignUpDTO>(
  "auth/submitSignUp",
  async (signupDTO: SignUpDTO, thunkAPI) => {
    try {
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

export const submitSignIn = createAppAsyncThunk<void, SignInDTO>(
  "auth/submitSignIn",
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

export const verifySignUpOrIn = createAppAsyncThunk<void, VerifyAccountDTO>(
  "auth/verifySignUpOrIn",
  async (verifySignUpDTO: VerifyAccountDTO, thunkAPI) => {
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
        path: "/auth/verifySignUpOrIn",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

export const reinitiateSignUpVerification = createAppAsyncThunk<
  void,
  ReinitiateVerificationDTO
>(
  "auth/reinitiateVerification",
  async (reinitiateVerifySignUpDTO: ReinitiateVerificationDTO, thunkAPI) => {
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

export const submitSignOut = createAppAsyncThunk<void, void>(
  "auth/submitSignOut",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
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
        path: "/auth/signout",
        message:
          error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      });
    }
  },
);

const initialState: AuthState = {
  status: "idle",
  isSignedIn: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsSignedIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    },
    resetAuthStatus: (state) => {
      state.status = "idle";
    },
    resetAuthError: (state) => {
      state.error = null;
    },
    resetAuth: (state) => {
      state.status = "idle";
      state.isSignedIn = false;
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
      .addCase(verifySignUpOrIn.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(verifySignUpOrIn.fulfilled, (state) => {
        state.status = "succeeded";
        if (state.isSignedIn !== true) {
          state.isSignedIn = true;
        }
        state.error = null;
        if (localStorage.getItem("signedInStatus") !== "signed in") {
          localStorage.setItem("signedInStatus", "signed in");
        }
      })
      .addCase(verifySignUpOrIn.rejected, (state, action) => {
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
      })
      .addCase(submitSignIn.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(submitSignIn.fulfilled, (state) => {
        state.status = "succeeded";
        if (state.isSignedIn !== true) {
          state.isSignedIn = true;
        }
        state.error = null;
        if (localStorage.getItem("signedInStatus") !== "signed in") {
          localStorage.setItem("signedInStatus", "signed in");
        }
      })
      .addCase(submitSignIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })
      .addCase(submitSignOut.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(submitSignOut.fulfilled, (state) => {
        state.status = "succeeded";
        if (state.isSignedIn !== false) {
          state.isSignedIn = false;
        }
        state.error = null;
        if (localStorage.getItem("signedInStatus") !== "not signed in") {
          localStorage.setItem("signedInStatus", "not signed in");
        }
      })
      .addCase(submitSignOut.rejected, (state, action) => {
        state.status = "failed";
        if (state.isSignedIn !== false) {
          state.isSignedIn = false;
        }
        state.error = action.payload || null;
        if (localStorage.getItem("signedInStatus") !== "not signed in") {
          localStorage.setItem("signedInStatus", "not signed in");
        }
      });
  },
});

export const { setIsSignedIn, resetAuthStatus, resetAuthError, resetAuth } =
  authSlice.actions;
export default authSlice.reducer;
