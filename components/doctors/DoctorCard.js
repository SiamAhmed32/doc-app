"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../ui/Button";
import { getDoctorImage } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PlaceholderInitials = ({ name }) => (
  <div className="flex h-full w-full items-center justify-center bg-slate-200 text-4xl font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-400">
    {name?.charAt(0).toUpperCase()}
  </div>
);

// The card now takes an `onViewProfile` function as a prop
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
      className="flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="relative h-48 w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Photo of ${doctor.name}`}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <PlaceholderInitials name={doctor.name} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {doctor.name}
        </h3>
        <p className="text-sm text-sky-600 dark:text-sky-400">
          {doctor.specialization}
        </p>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          {/* The Link is now a Button that triggers the modal */}
          <Button
            onClick={() => onViewProfile(doctor)}
            variant="outline"
            className="w-full"
          >
            View Profile
          </Button>

          <Button
            onClick={() => onBookAppointment(doctor)}
            className="w-full"
            variant="default"
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
