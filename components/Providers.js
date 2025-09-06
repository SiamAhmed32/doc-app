// File: app/providers.js (Final Version)

"use client";

import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../store/index";

import AxiosInterceptor from "../components/auth/AxiosInterceptor";
import { ThemeProvider } from "@/context/ThemeProvider";

const queryClient = new QueryClient();

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AxiosInterceptor>{children}</AxiosInterceptor>
          <ToastContainer theme="colored" position="bottom-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
