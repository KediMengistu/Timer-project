// import {
//   createEntityAdapter,
//   createSlice,
//   EntityState,
//   PayloadAction,
// } from "@reduxjs/toolkit";
// import { createAppAsyncThunk, DefaultState } from "../../app/appTypes";
// import { Break } from "./breakDTO";

// export const retrieveAllBreaks = createAppAsyncThunk<Break[], string>(
//   "breaks/retrieveAllBreaks",
//   async (timerId: string, thunkAPI) => {
//     try {
//       const response = await fetch(`/api/breaks/get-all-breaks/${timerId}`, {
//         method: "GET",
//         headers: {
//           "Content-type": "application/json",
//         },
//         credentials: "include",
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         return thunkAPI.rejectWithValue(errorData);
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({
//         timestamp: new Date().toISOString(),
//         path: `/breaks/get-all-breaks/${timerId}`,
//         message:
//           error instanceof Error ? error.message : "Network error occurred",
//         statusCode: 500,
//       });
//     }
//   },
// );
