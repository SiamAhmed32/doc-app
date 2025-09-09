"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const team = [
  {
    name: "Dr. Ahsan Rahman",
    title: "Chief Medical Officer",
    image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
  },
  {
    name: "Sadia Hossain",
    title: "Lead Product Designer",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  },
  {
    name: "Dr. Nafisa Akter",
    title: "Patient Relations Lead",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
];

export default function TeamSection() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Dedicated professionals driving digital healthcare innovation.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="w-64 flex flex-col items-center text-center bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8"
            >
              <div className="relative h-28 w-28 mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full"
                  sizes="112px"
                />
              </div>
              <div className="text-lg font-semibold text-slate-900 dark:text-white">
                {member.name}
              </div>
              <div className="mt-2 text-slate-500 dark:text-slate-300 text-base">
                {member.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
