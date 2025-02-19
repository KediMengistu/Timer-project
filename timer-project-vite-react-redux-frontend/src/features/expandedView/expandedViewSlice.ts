import { createSlice } from "@reduxjs/toolkit";

export interface ExpandedViewState {
  value: boolean;
}

const initialState = {
  value: false,
} as ExpandedViewState;

export const expandedViewSlice = createSlice({
  name: "expandedView",
  initialState,
  reducers: {
    toggleExpandedView: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleExpandedView } = expandedViewSlice.actions;

export default expandedViewSlice.reducer;
