import { createSlice } from "@reduxjs/toolkit";

export interface locationState {
  value: boolean;
}

const initialState = {
  value:
    localStorage.getItem("location") !== null
      ? JSON.parse(localStorage.getItem("location")!)
      : false,
} as locationState;

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    toggleLocation: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleLocation } = locationSlice.actions;

export default locationSlice.reducer;
