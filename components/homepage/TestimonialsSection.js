"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const testimonials = [
  {
    name: "Fatima Ahmed",
    role: "Patient",
    quote:
      "Booking a pediatrician visit was hassle-free. The reminders and dashboard help me keep my family healthy.",
    image: "https://images.pexels.com/photos/1130625/pexels-photo-1130625.jpeg",
  },
  {
    name: "Dr. Rahman Khan",
    role: "Doctor",
    quote:
      "Managing my practice’s appointments online simplified my workday and improved patient satisfaction.",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
  },
  {
    name: "Sadia Islam",
    role: "Patient",
    quote:
      "I love being able to see all my past and upcoming appointments in one place. Trusted and modern platform!",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    name: "Anika Chowdhury",
    role: "Patient",
    quote:
      "It’s finally easy to find a specialist and book from my phone. The experience is clear and secure.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-900 sm:py-24 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Trusted by Patients and Doctors
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Real voices and real recommendations.
          </p>
        </div>

        {/* This relative div helps contain the Swiper instance */}
        <div className="relative">
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 120,
              modifier: 2.5,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            autoplay={{ delay: 4800, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".swiper-pagination-custom" }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-16"
          >
            {testimonials.map(({ name, role, quote, image }, idx) => (
              <SwiperSlide
                key={name + idx}
                className="!w-[80%] sm:!w-[60%] md:!w-[45%] lg:!w-[30%]"
              >
                <div className="flex h-full flex-col rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">
                  <p className="flex-grow text-slate-600 dark:text-slate-300">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center">
                    <Image
                      src={image}
                      alt={name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination-custom text-center mt-4"></div>
        </div>

        <style jsx global>{`
          .swiper-pagination-custom .swiper-pagination-bullet {
            background-color: #cbd5e1;
            opacity: 1;
            margin: 0 4px;
          }
          .swiper-pagination-custom .swiper-pagination-bullet-active {
            background-color: #38bdf8;
          }
        `}</style>
      </div>
    </section>
  );
}
