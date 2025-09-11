"use client";

import { motion } from "framer-motion";

const skeletonVariants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function DoctorCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <motion.div
        variants={skeletonVariants}
        initial="initial"
        animate="animate"
        className="h-48 w-full bg-slate-200 dark:bg-slate-700"
      />
      <div className="p-4">
        <motion.div
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
          className="h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-700"
        />
        <motion.div
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
          className="mt-2 h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-700"
        />
        <div className="mt-auto pt-4">
          <motion.div
            variants={skeletonVariants}
            initial="initial"
            animate="animate"
            className="h-10 w-full rounded-md bg-slate-200 dark:bg-slate-700"
          />
        </div>
      </div>
    </div>
  );
}