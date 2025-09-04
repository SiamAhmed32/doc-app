"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import apiClient from "@/lib/axios";

const AxiosInterceptor = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  return children;
};

export default AxiosInterceptor;
