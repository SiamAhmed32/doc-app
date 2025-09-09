"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const announcements = [
  "Telemedicine features now available.",
  "Mobile app launches this month!",
  "Your data is now safer with enhanced security.",
];

export default function AnnouncementBanner({ onClose, visible = true }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    if (!isVisible) return;
    const intvl = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % announcements.length);
    }, 4200);
    return () => clearInterval(intvl);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="banner"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ type: "spring", duration: 0.45 }}
        className="fixed left-0 top-0 w-full z-[60] py-1.5 px-4 flex items-center justify-center gap-3 text-xs sm:text-sm text-white bg-sky-600"
        style={{ minHeight: 36, margin: 0, border: 0 }}
      >
        <motion.span
          key={activeIdx}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          transition={{ type: "spring", duration: 0.45 }}
          className="inline-block text-center"
        >
          {announcements[activeIdx]}
        </motion.span>
        <button
          onClick={handleClose}
          aria-label="Dismiss announcement"
          className="ml-2 rounded hover:bg-sky-700/30 transition-colors p-1"
        >
          <X className="h-4 w-4 text-white" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
