"use client";

import { forwardRef } from "react";

const Input = forwardRef(
  ({ type = "text", label, className = "", children, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <div className="relative">
          <input
            type={type}
            ref={ref}
            className={
              `block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm ` +
              `focus:border-sky-500 focus:ring-sky-500 sm:text-sm ` +
              `dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ` +
              `dark:focus:border-sky-500 dark:focus:ring-sky-500 ${className}`
            }
            {...props}
          />

          {children}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
