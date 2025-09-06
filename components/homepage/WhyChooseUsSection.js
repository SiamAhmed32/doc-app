"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    name: "User-Centric Design",
    description:
      "Our platform is meticulously designed for ease of use, ensuring that both patients and doctors can navigate with absolute confidence and clarity.",
    image: "https://images.pexels.com/photos/3845983/pexels-photo-3845983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    align: "left",
  },
  {
    name: "Real-Time & Reliable",
    description:
      "Leveraging modern technology, all updates are reflected instantly. From booking to status changes, you are always informed.",
    image: "https://images.pexels.com/photos/7089393/pexels-photo-7089393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    align: "right",
  },
];

const Feature = ({ feature }) => {
  const isLeft = feature.align === "left";
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
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
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {feature.name}
        </h3>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          {feature.description}
        </p>
      </motion.div>
    </div>
  );
};

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto space-y-24 px-4">
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Why Choose Our Platform?
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              We built our system with a focus on reliability, user experience, and trust.
            </p>
          </div>
        {features.map((feature) => (
          <Feature key={feature.name} feature={feature} />
        ))}
      </div>
    </section>
  );
}