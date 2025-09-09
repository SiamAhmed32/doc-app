"use client";

import Image from "next/image";
import { getDoctorImage } from "@/lib/utils";
import Modal from "../ui/Modal";

export default function DoctorProfileModal({ doctor, onClose }) {
  if (!doctor) return null;
  const imageUrl = doctor.photo_url || getDoctorImage(doctor.id);

  return (
    <Modal isOpen={!!doctor} onClose={onClose} title={doctor.name}>
      <div className="flex flex-col items-center text-center">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full shadow-lg">
          <Image
            src={imageUrl}
            alt={`Photo of ${doctor.name}`}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <p className="mt-2 text-base sm:text-lg font-medium text-sky-600 dark:text-sky-400">
          {doctor.specialization}
        </p>
        <div className="mt-4 w-full space-y-2 border-t pt-4 text-left text-xs sm:text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
          <p>
            <span className="font-semibold">Email:</span> {doctor.email}
          </p>
          <p>
            A detailed professional biography is not yet available. Please feel
            free to book an appointment to discuss your health needs directly.
          </p>
        </div>
      </div>
    </Modal>
  );
}
