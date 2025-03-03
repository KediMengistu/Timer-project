import { createSlice } from "@reduxjs/toolkit";

export interface timeState {
  timezone: boolean;
}

const initialState = {
  timezone:
    localStorage.getItem("timezone") !== null
      ? localStorage.getItem("timezone")
      : false && localStorage.setItem("timezone", "Local"),
} as timeState;

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    toggleTimezone: (state) => {
      state.timezone = !state.timezone;
    },
  },
});

export const { toggleTimezone } = timeSlice.actions;

export default timeSlice.reducer;
