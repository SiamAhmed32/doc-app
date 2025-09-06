"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const { user, role } = useSelector((state) => state.auth);

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

  const getDashboardLink = () => {
    if (role === 'PATIENT') return '/patient/dashboard';
    if (role === 'DOCTOR') return '/doctor/dashboard';
    return '/login';
  };

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/3992933/pexels-photo-3992933.jpeg"
          alt="Healthcare background"
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
      </div>
      <motion.div
        className="relative z-10 w-full max-w-4xl px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Dedicated Care,
          <span className="block text-sky-400">Instantly Accessible.</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-200 sm:mt-6"
        >
          Welcome to the Doctor Appointment System. Find trusted specialists and
          manage your healthcare journey with confidence and ease.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-6"
        >
          {user ? (
            <Link href={getDashboardLink()}>
              <Button size="lg" variant="default">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/register">
                <Button size="lg" variant="default">
                  Join Now
                </Button>
              </Link>
              <Link
                href="/login"
                className="text-sm font-semibold leading-6 text-white transition-colors hover:text-sky-300"
              >
                Member Login <span aria-hidden="true">→</span>
              </Link>
            </>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
