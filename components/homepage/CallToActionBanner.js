"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import Link from "next/link";

export default function CallToActionBanner() {
  return (
    <section className="relative py-16 bg-gradient-to-r from-sky-500 to-sky-400 dark:from-sky-600 dark:to-cyan-600">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Ready to Take Control of Your Health?
        </motion.h2>
        <motion.p
          className="text-lg text-white/90 mb-8"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          Book your free appointment and join our thriving healthcare community.
        </motion.p>
        <Link href="/register">
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-sky-600 hover:bg-sky-100"
          >
            Get Started Now
          </Button>
        </Link>
      </div>
    </section>
  );
}
