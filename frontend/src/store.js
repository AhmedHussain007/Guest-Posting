import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import { authApiSlice } from "./apis/authApi";

export const mystore = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
});
