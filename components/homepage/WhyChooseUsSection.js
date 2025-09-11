"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    name: "Built for Real Health Needs",
    description:
      "Our platform prioritizes smooth booking, clear records, and strong patient-doctor relationships across every specialty.",
    image: "https://images.pexels.com/photos/5327653/pexels-photo-5327653.jpeg",
    align: "left",
  },
  {
    name: "Secure, Reliable, and Always On",
    description:
      "Industry-standard encryption keeps your data private, and 24/7 digital access ensures you’re always connected to care.",
    image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg",
    align: "right",
  },
];

const Feature = ({ feature }) => {
  const isLeft = feature.align === "left";
  return (
    <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-2xl ${
          isLeft ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <Image
          src={feature.image}
          alt={feature.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`text-center lg:text-left ${
          isLeft ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {feature.name}
        </h3>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
          {feature.description}
        </p>
      </motion.div>
    </div>
  );
};

export default function WhyChooseUsSection() {
  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-slate-900 overflow-x-hidden">
      <div className="container mx-auto space-y-16 sm:space-y-24 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Why Choose Our Platform?
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Built for privacy, reliability, and a seamless patient-doctor
            experience.
          </p>
        </div>
        {features.map((feature) => (
          <Feature key={feature.name} feature={feature} />
        ))}
      </div>
    </section>
  );
}
