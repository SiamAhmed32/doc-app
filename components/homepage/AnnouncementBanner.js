"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const announcements = [
  "Telemedicine features now available.",
  "Mobile app launches this month!",
  "All new security: your data is safer than ever.",
  "Specialists and clinics added in new districts.",
];

export default function AnnouncementBanner() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const intvl = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(intvl);
  }, []);

  return (
    <div className="w-full bg-sky-600 py-2 text-white font-medium text-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={activeIdx}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ type: "spring", duration: 0.55 }}
          className="inline-block"
        >
          {announcements[activeIdx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
