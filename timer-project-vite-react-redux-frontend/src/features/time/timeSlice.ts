import { createSlice } from "@reduxjs/toolkit";

export interface timeBreakdown {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface timeState {
  timezone: "local" | "UTC";
}

const initialState = {
  timezone:
    localStorage.getItem("timezone") !== null
      ? localStorage.getItem("timezone")
      : "UTC",
} as timeState;

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    toggleTimezone: (state) => {
      state.timezone === "local"
        ? (state.timezone = "UTC")
        : (state.timezone = "local");
    },
  },
});

export const { toggleTimezone } = timeSlice.actions;

export default timeSlice.reducer;
