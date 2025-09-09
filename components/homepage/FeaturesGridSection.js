"use client";

import { motion } from "framer-motion";
import { Stethoscope, CalendarClock, Shield, UserCheck } from "lucide-react";

// All icons and text are contextual for healthcare
const features = [
  {
    Icon: Stethoscope,
    title: "Verified Doctors",
    detail:
      "Everyone on our platform is a certified specialist—book appointments with confidence.",
  },
  {
    Icon: CalendarClock,
    title: "Flexible Scheduling",
    detail:
      "Book, reschedule, or cancel any time—24/7, all from your dashboard or mobile.",
  },
  {
    Icon: Shield,
    title: "Secure by Design",
    detail:
      "Bank-level encryption ensures your health records and messages remain private.",
  },
  {
    Icon: UserCheck,
    title: "Personalized Care",
    detail:
      "Pick your favorite doctors, see your care history, and get reminders tailored for you.",
  },
];

export default function FeaturesGridSection() {
  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Platform Benefits at a Glance
          </h2>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ Icon, title, detail }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.13 }}
              className="bg-sky-50 dark:bg-slate-800/80 rounded-2xl p-8 shadow-md text-center flex flex-col items-center"
            >
              <Icon
                className="h-10 w-10 mx-auto text-sky-500 mb-3"
                strokeWidth={2}
              />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">{detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
