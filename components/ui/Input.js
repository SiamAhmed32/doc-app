"use client";

import { forwardRef } from "react";

const Input = forwardRef(({ type = "text", label, ...props }, ref) => {
  return (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        ref={ref}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input"; // Recommended for debugging
export default Input;
