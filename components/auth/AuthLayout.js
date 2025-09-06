import { motion } from "framer-motion";

const AuthGraphic = () => (
  <div className="relative h-full w-full">
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient
          id="auth-gradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="800" fill="url(#auth-gradient)" />
    </svg>

    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Doctor Appointment System
        </h1>
        <p className="mt-4 max-w-sm text-lg text-sky-100/80">
          The future of healthcare management is here. Seamlessly connect with
          patients and providers.
        </p>
      </div>
    </div>
  </div>
);

export default function AuthLayout({ children }) {
  return (
    <section className="min-h-screen bg-white dark:bg-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="relative flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
        <div className="relative hidden bg-sky-600 lg:block">
          <AuthGraphic />
        </div>
      </div>
    </section>
  );
}
