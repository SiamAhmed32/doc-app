"use client";

import { motion } from "framer-motion";

const Button = ({ children, className = "", size = "md", ...props }) => {
  const sizeClasses = {
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-semibold text-white bg-blue-600 shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-900 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const AnimatedDoctorIcon = () => (
  <motion.div
    className="relative w-full max-w-lg mx-auto"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-200 rounded-full opacity-30 dark:bg-blue-900/40 blur-2xl"></div>
    <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute top-10 left-20 w-16 h-16 bg-teal-200/80 dark:bg-teal-500/50 rounded-full shadow-lg"
    ></motion.div>
    <motion.div
      animate={{ x: [5, -5, 5] }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
      className="absolute bottom-16 right-16 w-24 h-24 bg-blue-300/80 dark:bg-blue-600/50 rounded-full shadow-xl"
    ></motion.div>
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute bottom-24 left-10 w-12 h-12 bg-indigo-200/80 dark:bg-indigo-500/50 rounded-full shadow-md"
    ></motion.div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="relative z-10 w-full h-auto text-gray-800 dark:text-gray-100"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
      <path d="M12 8v4" />
      <path d="M12 12h.01" />
      <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9c2.39 0 4.58.91 6.18 2.38" />
      <path d="m14.5 15.5 1 1" />
      <path d="m9.5 15.5-1 1" />
    </svg>
  </motion.div>
);

export default function HomePage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20"></div>

      <motion.div
        className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 text-center md:grid-cols-2 md:text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="order-2 md:order-1">
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
          >
            Your Health,
            <span className="block text-blue-600 dark:text-blue-400">
              Simplified.
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Easily book and manage your medical appointments with top
            specialists. Seamless, secure, and built for you.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row md:justify-start"
          >
            <a href="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </a>
            <a
              href="/register"
              className="text-sm font-semibold leading-6 text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
            >
              Create an account <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>

        <div className="order-1 md:order-2">
          <AnimatedDoctorIcon />
        </div>
      </motion.div>
    </section>
  );
}

