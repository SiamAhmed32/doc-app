"use client";

import { motion } from "framer-motion";
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
      "This platform made finding a cardiologist in Dhaka incredibly simple. The booking process was seamless, and I had my appointment confirmed in minutes. Highly recommended!",
    image:
      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Dr. Rahman Khan",
    role: "General Physician",
    quote:
      "As a doctor, managing my schedule has never been easier. The dashboard is intuitive and helps me focus on what truly matters: my patients' health.",
    image:
      "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Sadia Islam",
    role: "Patient",
    quote:
      "I love how I can see all my past and upcoming appointments in one place. It gives me a great sense of control over my family's healthcare.",
    image:
      "https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Anika Chowdhury",
    role: "Patient",
    quote:
      "The ability to filter doctors by specialization saved me so much time and effort. A truly user-friendly experience from start to finish.",
    image:
      "https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-900 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Trusted by Patients and Doctors
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Hear what our users have to say about their experience.
          </p>
        </motion.div>

        <div className="mt-16">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".swiper-pagination-custom" }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="!pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide
                key={index}
                className="!w-[80%] sm:!w-[60%] md:!w-[45%] lg:!w-[30%]"
              >
                <div className="flex h-full flex-col rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">
                  <p className="flex-grow text-slate-600 dark:text-slate-300">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination-custom text-center mt-4"></div>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          background-color: #cbd5e1;
          opacity: 1;
          margin: 0 4px;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background-color: #3b82f6;
        }
      `}</style>
    </section>
  );
}
