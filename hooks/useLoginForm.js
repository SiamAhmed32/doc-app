"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { loginSchema } from "@/lib/validations/auth";
import apiClient from "@/lib/axios";
import { setCredentials } from "@/store/slices/authSlice";

const loginUser = async (data) => {
  const { data: response } = await apiClient.post("/auth/login", data);
  return response;
};

/**
 * @hook useLoginForm
 * @description Manages the entire state, validation, and submission logic for the login form.
 */
export function useLoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "PATIENT",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setCredentials(data.data));
      toast.success("Login successful!");

      const userRole = data.data.user.role;
      if (userRole === "PATIENT") {
        router.push("/patient/dashboard");
      } else if (userRole === "DOCTOR") {
        router.push("/doctor/dashboard");
      }
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    },
  });

  return { register, handleSubmit, errors, isPending, mutate };
}