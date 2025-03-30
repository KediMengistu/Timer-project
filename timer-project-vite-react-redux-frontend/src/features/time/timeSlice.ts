import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TimeState {
  timezone: boolean;
}

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
