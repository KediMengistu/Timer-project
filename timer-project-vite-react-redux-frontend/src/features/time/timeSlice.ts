import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";

export interface TimeState {
  timezone: boolean;
}

export const fetchAndSetTimezone = (): AppThunk => {
  return (dispatch, getState) => {
    //holder variable stores initial value for timezone state upon application start - false (indicates local time).
    let currentTimezoneState: boolean = getState().time.timezone;

    //localStorage contains timezone key.
    if (localStorage.getItem("timezone") !== null) {
      localStorage.getItem("timezone") === "local"
        ? (currentTimezoneState = false)
        : (currentTimezoneState = true);
    }
    //localStorage does not contain timezone key.
    else {
      localStorage.setItem("timezone", "local");
    }

    //set the initial value for timezone to be false in case of no timezone key in localStorage or the current stored value in localStorage.
    dispatch(setTimezone(currentTimezoneState));
  };
};

const initialState = {
  timezone: false,
} as TimeState;

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setTimezone: (state, action: PayloadAction<boolean>) => {
      state.timezone = action.payload;
    },
    toggleTimezone: (state) => {
      state.timezone = !state.timezone;
    },
  },
});

export const { setTimezone, toggleTimezone } = timeSlice.actions;

export default timeSlice.reducer;
