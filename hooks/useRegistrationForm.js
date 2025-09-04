"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  patientRegisterSchema,
  doctorRegisterSchema,
} from "@/lib/validations/auth";
import apiClient from "@/lib/axios";

const registerUser = async (data) => {
  const { role, ...payload } = data;
  const endpoint =
    role === "PATIENT" ? "/auth/register/patient" : "/auth/register/doctor";
  const { data: response } = await apiClient.post(endpoint, payload);
  return response;
};

const fetchSpecializations = async () => {
  const response = await apiClient.get("/specializations");
  return response.data.data;
};

/**
 * @hook useRegistrationForm
 * @description Manages state, validation, and submission for the user registration form.
 */
export function useRegistrationForm() {
  const [role, setRole] = useState("PATIENT");
  const router = useRouter();

  const { data: specializations, isLoading: isLoadingSpecializations } =
    useQuery({
      queryKey: ["specializations"],
      queryFn: fetchSpecializations,
      // This is a complex but important optimization: only fetch the data when the doctor tab is active.
      enabled: role === "DOCTOR",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(
      role === "PATIENT" ? patientRegisterSchema : doctorRegisterSchema
    ),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      photo_url: "",
      specialization: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registration successful! Please log in.");
      router.push("/login");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Registration failed.";
      toast.error(message);
    },
  });

  useEffect(() => {
    reset();
  }, [role, reset]);

  const onSubmit = (data) => {
    const dataWithRole = { ...data, role };
    if (dataWithRole.role === "PATIENT") delete dataWithRole.specialization;
    if (!dataWithRole.photo_url) delete dataWithRole.photo_url;
    mutate(dataWithRole);
  };

  return {
    role,
    setRole,
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
    specializations,
    isLoadingSpecializations,
  };
}
