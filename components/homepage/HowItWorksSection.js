"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";

const steps = [
  {
    name: "Find Your Doctor",
    description:
      "Use advanced search and filters to discover specialists for your unique health needs.",
    image: "https://images.pexels.com/photos/6129685/pexels-photo-6129685.jpeg",
  },
  {
    name: "Book in Seconds",
    description:
      "Confirm your appointment instantly. Choose the times and specialists that best fit your schedule.",
    image: "https://images.pexels.com/photos/5452270/pexels-photo-5452270.jpeg",
  },
  {
    name: "Manage and Track",
    description:
      "Everything in one dashboard—see upcoming visits and never miss a consultation.",
    image: "https://images.pexels.com/photos/7088480/pexels-photo-7088480.jpeg",
  },
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Modern, fast and made for every patient and provider.
          </p>
        </div>
        <div className="mt-14 grid items-center gap-10 md:gap-14 lg:grid-cols-2">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.name}
                onMouseEnter={() => setActiveStep(index)}
                onFocus={() => setActiveStep(index)}
                className={`cursor-pointer rounded-xl p-6 transition-colors ${
                  activeStep === index
                    ? "bg-sky-50 dark:bg-slate-800 shadow-2xl ring-2 ring-sky-400/40"
                    : "bg-transparent dark:bg-transparent"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                tabIndex={0}
                aria-label={step.name}
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
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 1.07 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={steps[activeStep].image}
                  alt={steps[activeStep].name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link href="/register">
            <Button size="lg" variant="default">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
