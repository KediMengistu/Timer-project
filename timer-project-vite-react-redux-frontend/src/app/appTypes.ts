import { Action, ThunkAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface ApiErrorResponse {
  timestamp: string;
  path: string;
  message: string;
  statusCode: number;
}

export type RootState = any;
export type AppDispatch = any;

export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: ApiErrorResponse;
}>();
