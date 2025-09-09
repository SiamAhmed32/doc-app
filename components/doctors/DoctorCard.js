"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../ui/Button";
import { getDoctorImage } from "@/lib/utils";

// Fallback for missing image: initial (first letter) or stock photo
const PlaceholderInitials = ({ name }) => (
  <div className="flex h-full w-full items-center justify-center bg-slate-200 text-3xl font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-400">
    {name?.charAt(0).toUpperCase()}
  </div>
);

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DoctorCard({
  doctor,
  onBookAppointment,
  onViewProfile,
  fallbackType = "initials",
}) {
  let imageUrl = doctor.photo_url;
  if (!imageUrl) {
    imageUrl = fallbackType === "stock" ? getDoctorImage(doctor.id) : null;
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex flex-col h-full overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-gray-800"
    >
      <div className="relative h-36 w-full sm:h-48">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Photo of ${doctor.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <PlaceholderInitials name={doctor.name} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 truncate max-w-[170px] sm:max-w-none">
          {doctor.name}
        </h3>
        <p className="text-xs sm:text-sm text-sky-600 dark:text-sky-400 truncate max-w-[140px] sm:max-w-none">
          {doctor.specialization}
        </p>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <Button
            onClick={() => onViewProfile(doctor)}
            variant="outline"
            size="sm"
            className="w-full"
          >
            View Profile
          </Button>
          <Button
            onClick={() => onBookAppointment(doctor)}
            variant="default"
            size="sm"
            className="w-full"
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
