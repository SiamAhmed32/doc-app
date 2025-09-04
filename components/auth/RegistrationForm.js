"use client";

import Link from "next/link";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function RegistrationForm() {
  const {
    role,
    setRole,
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
    specializations,
    isLoadingSpecializations,
  } = useRegistrationForm();

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Create an Account
      </h2>

      <div className="mb-6 flex rounded-md border p-1">
        <button
          onClick={() => setRole("PATIENT")}
          className={`w-1/2 rounded-md p-2 text-sm font-medium transition-colors ${
            role === "PATIENT"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          disabled={isPending}
        >
          Register as Patient
        </button>
        <button
          onClick={() => setRole("DOCTOR")}
          className={`w-1/2 rounded-md p-2 text-sm font-medium transition-colors ${
            role === "DOCTOR"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          disabled={isPending}
        >
          Register as Doctor
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Full Name"
          id="name"
          type="text"
          placeholder="John Doe"
          disabled={isPending}
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}

        <Input
          label="Email Address"
          id="email"
          type="email"
          placeholder="john.doe@example.com"
          disabled={isPending}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}

        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          disabled={isPending}
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
        )}

        <Input
          label="Photo URL (Optional)"
          id="photo_url"
          type="text"
          placeholder="https://example.com/photo.jpg"
          disabled={isPending}
          {...register("photo_url")}
        />
        {errors.photo_url && (
          <p className="mt-1 text-xs text-red-500">
            {errors.photo_url.message}
          </p>
        )}

        {role === "DOCTOR" && (
          <div className="mb-4">
            <label
              htmlFor="specialization"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Specialization
            </label>
            <select
              id="specialization"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              disabled={isLoadingSpecializations || isPending}
              {...register("specialization")}
            >
              <option value="">
                {isLoadingSpecializations
                  ? "Loading..."
                  : "Select a specialization"}
              </option>
              {specializations?.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
            {errors.specialization && (
              <p className="mt-1 text-xs text-red-500">
                {errors.specialization.message}
              </p>
            )}
          </div>
        )}

        <Button type="submit" className="mt-4" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
