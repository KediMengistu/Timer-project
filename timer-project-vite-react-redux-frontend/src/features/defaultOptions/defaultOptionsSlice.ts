import { createSlice } from "@reduxjs/toolkit";

export interface defaultOptionsState {
  userActionsOption: boolean;
  guestTimerOption: boolean;
  aboutOption: boolean;
}

const initialState = {
  userActionsOption: false,
  guestTimerOption: false,
  aboutOption: false,
} as defaultOptionsState;

export const defaultOptionsSlice = createSlice({
  name: "defaultOptions",
  initialState,
  reducers: {
    toggleUserActionsOption: (state) => {
      state.userActionsOption = !state.userActionsOption;
      state.guestTimerOption
        ? (state.guestTimerOption = !state.guestTimerOption)
        : (state.guestTimerOption = state.guestTimerOption);
      state.aboutOption
        ? (state.aboutOption = !state.aboutOption)
        : (state.aboutOption = state.aboutOption);
    },
    toggleGuestTimerOption: (state) => {
      state.guestTimerOption = !state.guestTimerOption;
      state.userActionsOption
        ? (state.userActionsOption = !state.userActionsOption)
        : (state.userActionsOption = state.userActionsOption);
      state.aboutOption
        ? (state.aboutOption = !state.aboutOption)
        : (state.aboutOption = state.aboutOption);
    },
    toggleAboutOption: (state) => {
      state.aboutOption = !state.aboutOption;
      state.userActionsOption
        ? (state.userActionsOption = !state.userActionsOption)
        : (state.userActionsOption = state.userActionsOption);
      state.guestTimerOption
        ? (state.guestTimerOption = !state.guestTimerOption)
        : (state.guestTimerOption = state.guestTimerOption);
    },
  },
});

export const {
  toggleUserActionsOption,
  toggleGuestTimerOption,
  toggleAboutOption,
} = defaultOptionsSlice.actions;

export default defaultOptionsSlice.reducer;
