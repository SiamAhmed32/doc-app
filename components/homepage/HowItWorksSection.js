"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "../ui/Button";

const steps = [
  {
    name: "Find Your Doctor",
    description:
      "Use our advanced, real-time search to filter by specialization and find the perfect healthcare provider for your needs.",
    image:
      "https://images.pexels.com/photos/8442898/pexels-photo-8442898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Book an Appointment",
    description:
      "Select a convenient date from the doctor's schedule with our intuitive date picker and confirm your booking instantly.",
    image:
      "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Manage Your Health",
    description:
      "View all your upcoming and past appointments, check their status, and manage your healthcare journey all in one secure place.",
    image:
      "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Effortless Booking, Simplified
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            A seamless experience from start to finish.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.name}
                onHoverStart={() => setActiveStep(index)}
                className={`cursor-pointer rounded-xl p-6 transition-colors ${
                  activeStep === index
                    ? "bg-white shadow-2xl ring-2 ring-sky-500/50 dark:bg-slate-800"
                    : "bg-transparent dark:bg-transparent"
                }`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-500 font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    {step.name}
                  </h3>
                </div>
                <p className="mt-3 text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="relative aspect-[4/3] w-full">
            <AnimatePresence>
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-2xl"
              >
                <Image
                  src={steps[activeStep].image}
                  alt={steps[activeStep].name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-16 text-center">
          <a href="/register">
            <Button size="lg" variant="default">
              Start Your Journey Now
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
