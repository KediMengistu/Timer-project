import { Action, ThunkAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface ApiErrorResponse {
  timestamp: string;
  path: string;
  message: string | string[];
  statusCode: number;
}

export interface DefaultState {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: ApiErrorResponse | null;
}

export interface ReinitiateVerificationDTO {
  email: string;
  verificationAction: string;
}

export type RootState = any;
export type AppDispatch = any;

export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: ApiErrorResponse;
}>();
