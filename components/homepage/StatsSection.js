"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Active Patients", value: "12k+" },
  { label: "Doctors Registered", value: "2,500+" },
  { label: "Cities Covered", value: "35" },
  { label: "Avg. Booking Time", value: "42 sec" },
];

export default function StatsSection() {
  return (
    <section className="py-10 bg-sky-50 dark:bg-slate-800">
      <div className="container mx-auto grid grid-cols-2 gap-6 sm:grid-cols-4 px-4">
        {stats.map(({ label, value }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.13 }}
            className="rounded-xl bg-white dark:bg-slate-900 shadow-md flex flex-col items-center justify-center py-8"
          >
            <div className="text-3xl font-extrabold text-sky-600 dark:text-sky-400">
              {value}
            </div>
            <div className="mt-2 text-base font-medium text-slate-700 dark:text-slate-300">
              {label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
