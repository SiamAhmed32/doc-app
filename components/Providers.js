"use client";

import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../store";
import AxiosInterceptor from "./auth/AxiosInterceptor";

const queryClient = new QueryClient();

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AxiosInterceptor>{children}</AxiosInterceptor>
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  );
}
