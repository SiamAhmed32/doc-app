"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";

const PlaceholderIcon = () => (
  <svg
    className="h-full w-full text-gray-300 dark:text-gray-600"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M24 20.993V24H0v-2.993A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DoctorCard({ doctor, onBookAppointment }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="h-48 w-full bg-gray-100 dark:bg-gray-700">
        {doctor.photo_url ? (
          <img
            src={doctor.photo_url}
            alt={`Photo of ${doctor.name}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <PlaceholderIcon />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {doctor.name}
        </h3>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          {doctor.specialization}
        </p>
        <div className="mt-auto pt-4">
          <Button onClick={onBookAppointment}>Book Appointment</Button>
        </div>
      </div>
    </motion.div>
  );
}
