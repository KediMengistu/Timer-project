import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { ApiErrorResponse, createAppAsyncThunk } from "../../app/appTypes";
import APP_URL from "../../utils/server/server-info";

export interface SignedInStatusState {
  status: "idle" | "pending" | "succeeded" | "failed";
  value: boolean;
  error: ApiErrorResponse | null;
}

export const fetchAndSetSignedInStatus = (): AppThunk => {
  return (dispatch, getState) => {
    //stores initial value for signedInStatusState; false.
    let currentSignedInStatusState: boolean = getState().signedInStatus.value;

    //localStorage has persisted the signedInStatusState key value between app starts so we extract it from localStorage.
    //false - not signed in.
    //true - signed in.
    if (localStorage.getItem("signedInStatus") === "not signed in") {
      localStorage.removeItem("signedInStatus");
    } else {
      currentSignedInStatusState = true;
      dispatch(setSignedInStatus(currentSignedInStatusState));
    }
  };
};

export const clearSignedInStatus = createAppAsyncThunk<void, void>(
  "signedInStatus/clearSignedInStatus",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${APP_URL}/auth/signout`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          credentials: "include",
        },
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

const initialState = {
  status: "idle",
  value: false,
  error: null,
} as SignedInStatusState;

export const signedInStatusSlice = createSlice({
  name: "signedInStatus",
  initialState,
  reducers: {
    setSignedInStatus: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    resetClearSignedInStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(clearSignedInStatus.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(clearSignedInStatus.fulfilled, (state) => {
        state.status = "succeeded";
        if (state.value !== false) {
          state.value = false;
        }
        state.error = null;
        if (localStorage.getItem("signedInStatus") !== "not signed in") {
          localStorage.setItem("signedInStatus", "not signed in");
        }
      })
      .addCase(clearSignedInStatus.rejected, (state, action) => {
        state.status = "failed";
        if (state.value !== false) {
          state.value = false;
        }
        state.error = action.payload || null;
        if (localStorage.getItem("signedInStatus") !== "not signed in") {
          localStorage.setItem("signedInStatus", "not signed in");
        }
      });
  },
});

export const { setSignedInStatus, resetClearSignedInStatus } =
  signedInStatusSlice.actions;

export default signedInStatusSlice.reducer;
