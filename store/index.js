import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // Enabling Redux DevTools only in development for security and performance.
  devTools: process.env.NODE_ENV !== "production",
});
