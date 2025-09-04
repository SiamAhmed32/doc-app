"use client";

import Link from "next/link";
import { useLoginForm } from "@/hooks/useLoginForm";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function LoginForm() {
  const { register, handleSubmit, errors, isPending, mutate } = useLoginForm();

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-slate-800">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className="mb-4">
          <label
            htmlFor="role"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300"
          >
            Login as
          </label>
          <select
            id="role"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 sm:text-sm"
            disabled={isPending}
            {...register("role")}
          >
            <option value="PATIENT">Patient</option>
            <option value="DOCTOR">Doctor</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="mt-4 w-full"
          isLoading={isPending}
          variant="default"
        >
          Login
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline dark:text-sky-400"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
