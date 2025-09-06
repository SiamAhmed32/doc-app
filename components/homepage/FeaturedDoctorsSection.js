
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";

import { fetchDoctors } from "@/lib/api/doctors";
import DoctorCard from "../doctors/DoctorCard";
import DoctorProfileModal from "../doctors/DoctorProfileModal";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import AppointmentBookingForm from "../doctors/AppointmentBookingForm";

import "swiper/css";
import "swiper/css/pagination";

export default function FeaturedDoctorsSection() {
  const [doctorForBooking, setDoctorForBooking] = useState(null);
  const [doctorForProfile, setDoctorForProfile] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["featured-doctors"],
    queryFn: () => fetchDoctors({ limit: 6 }),
  });

  const doctors = data?.data || [];

  if (isLoading || isError || doctors.length === 0) {
    return null;
  }

  const handleBookNow = (doctor) => {
    if (user) {
      setDoctorForBooking(doctor);
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-900 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Meet Our Specialists
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Browse some of the top-rated healthcare professionals on our
            platform.
          </p>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="!pb-12"
        >
          {doctors.map((doctor) => (
            <SwiperSlide key={doctor.id} className="h-auto">
              <div className="h-full">
                <DoctorCard
                  doctor={doctor}
                  fallbackType="stock"
                  onBookAppointment={handleBookNow}
                  onViewProfile={setDoctorForProfile} // 2. Pass the function as a prop
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-12 text-center">
          <Link href="/patient/dashboard">
            <Button variant="outline" size="lg">
              View All Doctors
            </Button>
          </Link>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={!!doctorForBooking}
        onClose={() => setDoctorForBooking(null)}
        title={`Book Appointment with ${doctorForBooking?.name}`}
      >
        {doctorForBooking && (
          <AppointmentBookingForm
            doctorId={doctorForBooking.id}
            onClose={() => setDoctorForBooking(null)}
          />
        )}
      </Modal>

      <DoctorProfileModal
        doctor={doctorForProfile}
        onClose={() => setDoctorForProfile(null)}
      />
    </section>
  );
}
