"use client";

import { motion } from "framer-motion";

export default function HeroSkeleton() {
  return (
    <div className="relative h-screen min-h-[500px] w-full bg-slate-800 flex flex-col justify-center items-center text-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-white/10"
      />

      <div className="h-10 sm:h-14 w-3/4 max-w-2xl bg-slate-700/80 rounded-lg mb-5 animate-pulse" />

      <div className="h-6 w-1/2 max-w-lg bg-slate-700/80 rounded-lg mb-8 animate-pulse" />

      <div className="h-14 w-48 bg-sky-500/80 rounded-lg animate-pulse" />
    </div>
  );
}
