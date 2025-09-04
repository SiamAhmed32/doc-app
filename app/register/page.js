"use client";

import { motion } from "framer-motion";
import RegistrationForm from "../../components/auth/RegistrationForm";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const CheckIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const BrandingPanel = () => (
  <motion.div
    className="hidden lg:flex lg:flex-col lg:justify-between p-12 bg-slate-900 text-white"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <div className="text-2xl font-bold">
      Doctor Appointment <span className="text-sky-400"> System</span>
    </div>
    <div>
      <motion.h1
        variants={itemVariants}
        className="text-4xl font-bold leading-tight tracking-tight"
      >
        Join the Future of Doctor Appointment System
      </motion.h1>
      <motion.p variants={itemVariants} className="mt-4 text-slate-300">
        Create your account to start connecting with top specialists and
        managing your appointments seamlessly.
      </motion.p>
    </div>
    <motion.div variants={itemVariants} className="space-y-4">
      <div className="flex items-center gap-3">
        <CheckIcon className="h-6 w-6 text-sky-400 flex-shrink-0" />
        <span>For both patients and doctors.</span>
      </div>
      <div className="flex items-center gap-3">
        <CheckIcon className="h-6 w-6 text-sky-400 flex-shrink-0" />
        <span>Quick and easy registration process.</span>
      </div>
      <div className="flex items-center gap-3">
        <CheckIcon className="h-6 w-6 text-sky-400 flex-shrink-0" />
        <span>Access your dashboard instantly.</span>
      </div>
    </motion.div>
  </motion.div>
);

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full bg-white dark:bg-slate-950">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <BrandingPanel />
        <div className="flex items-center justify-center p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="w-full"
          >
            <RegistrationForm />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
