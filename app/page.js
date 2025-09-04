"use client";

import { motion } from "framer-motion";
import Button from "../components/ui/Button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const StethoscopeIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 9.5a5 5 0 0 1 5 5v5a5 5 0 0 1-5 5" />
    <path d="M9.5 4.5a5 5 0 0 1 5 5v10.5" />
    <path d="M14 10.5h4" />
    <path d="M16 8.5v4" />
    <circle cx="19" cy="10.5" r="2.5" />
    <circle cx="7" cy="7" r="2.5" />
  </svg>
);

const SearchIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const CalendarIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 12.75h.008v.008H12v-.008z"
    />
  </svg>
);

const ListIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.008v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.008v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.008v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
    />
  </svg>
);

const HeroSection = () => (
  <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-900">
    <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-teal-50 dark:from-slate-900 dark:via-slate-900 dark:to-sky-900/20"></div>
    <motion.div
      className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 text-center md:grid-cols-2 md:text-left"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="order-2 md:order-1">
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl"
        >
          Your Health,
          <span className="block text-sky-600 dark:text-sky-400">
            Simplified.
          </span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300"
        >
          Easily book and manage your medical appointments with top specialists.
          Seamless, secure, and built for you.
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
            className="text-sm font-semibold leading-6 text-slate-900 transition-colors hover:text-sky-600 dark:text-slate-100 dark:hover:text-sky-400"
          >
            Create an account <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
      <div className="order-1 md:order-2">
        <StethoscopeIcon className="relative z-10 h-auto w-full max-w-md text-slate-400 dark:text-slate-600" />
      </div>
    </motion.div>
  </section>
);

const StepCard = ({ icon, title, description, step }) => (
  <motion.div
    variants={cardVariants}
    className="rounded-xl border border-slate-200 bg-white/50 p-6 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900/50"
  >
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 ring-8 ring-slate-100/50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-800/50">
      {icon}
    </div>
    <h3 className="mt-6 text-lg font-semibold text-slate-800 dark:text-white">
      {title}
    </h3>
    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
      {description}
    </p>
    <span className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 font-bold text-white">
      {step}
    </span>
  </motion.div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="rounded-lg bg-slate-100 p-6 dark:bg-slate-800">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500 text-white">
      {icon}
    </div>
    <h3 className="mt-5 text-lg font-medium text-slate-900 dark:text-white">
      {title}
    </h3>
    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
      {description}
    </p>
  </div>
);

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      <HeroSection />

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 sm:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Effortless Booking in 3 Simple Steps
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Get from search to scheduled in just a few clicks.
            </p>
          </div>
          <div className="relative mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <StepCard
              icon={<SearchIcon className="h-6 w-6" />}
              title="Find Your Doctor"
              description="Search by name or specialization to find the perfect healthcare provider for your needs."
              step="1"
            />
            <StepCard
              icon={<CalendarIcon className="h-6 w-6" />}
              title="Book an Appointment"
              description="Select a convenient date and time from the doctor's schedule and confirm your booking instantly."
              step="2"
            />
            <StepCard
              icon={<ListIcon className="h-6 w-6" />}
              title="Manage Your Health"
              description="View your upcoming appointments, check statuses, and manage your healthcare journey all in one place."
              step="3"
            />
          </div>
        </div>
      </motion.section>

      <section className="bg-slate-50 py-16 dark:bg-slate-900 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              A Platform Built for Patients and Doctors
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Everything you need to manage healthcare appointments with ease
              and efficiency.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<SearchIcon className="h-6 w-6" />}
              title="Advanced Search"
              description="Filter doctors by specialization and name with our real-time, responsive search functionality."
            />
            <FeatureCard
              icon={<CalendarIcon className="h-6 w-6" />}
              title="Secure Booking"
              description="Your appointments are confirmed instantly and managed securely on our platform."
            />
            <FeatureCard
              icon={<ListIcon className="h-6 w-6" />}
              title="Real-time Updates"
              description="Doctors can update appointment statuses in real-time, keeping you informed every step of the way."
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="relative isolate overflow-hidden rounded-2xl bg-slate-900 px-6 py-16 text-center shadow-2xl sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to take control of your health?
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Join today and experience the future of healthcare management.
            </p>
            <div className="mt-8">
              <a href="/register">
                <Button variant="outline" size="lg">
                  Sign Up Now
                </Button>
              </a>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#gradient)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="gradient">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#0EA5E9" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} HealthCare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
