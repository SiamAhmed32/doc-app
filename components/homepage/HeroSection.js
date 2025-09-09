"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";

// Only professional, healthcare-relevant images
const slides = [
  {
    image: "https://images.pexels.com/photos/6749776/pexels-photo-6749776.jpeg",
    headline: "Find Your Doctor, Instantly",
    subhead:
      "Connect with certified, trusted specialists and clinics in seconds.",
    cta: { text: "Find Doctors", href: "/patient/dashboard" },
  },
  {
    image: "https://images.pexels.com/photos/7578809/pexels-photo-7578809.jpeg",
    headline: "Book Appointments 24/7",
    subhead:
      "No waiting on the line—choose your time, receive instant confirmation, and stay on schedule.",
    cta: { text: "Book Now", href: "/register" },
  },
  {
    image: "https://images.pexels.com/photos/5327653/pexels-photo-5327653.jpeg",
    headline: "Everything In One Dashboard",
    subhead:
      "See all your visits, upcoming bookings, and doctor feedback in one secure place.",
    cta: { text: "Go to Dashboard", href: "/patient/dashboard" },
  },
  {
    image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg",
    headline: "Secure. Private. Trusted.",
    subhead:
      "Your medical data always stays yours: encrypted, private, and protected.",
    cta: { text: "Get Started", href: "/register" },
  },
];

export default function HeroSection() {
  return (
    <div className="relative h-screen min-h-[500px] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        slidesPerView={1}
        loop
        autoplay={{ delay: 4200, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.headline + idx}>
            <div className="relative h-screen min-h-[500px] w-full">
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                priority={idx === 0}
                className="absolute inset-0 h-full w-full object-cover object-center"
                sizes="100vw"
                style={{ zIndex: 1 }}
                quality={90}
                unoptimized={slide.image.startsWith(
                  "https://images.pexels.com/"
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent dark:from-slate-900/90 dark:via-sky-900/60 dark:to-transparent z-10 transition-colors" />
              <div className="relative z-20 flex flex-col justify-center items-center text-center h-full px-4">
                <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl text-white mb-5 drop-shadow-lg">
                  {slide.headline}
                </h1>
                <p className="text-lg max-w-xl text-white/80 mb-8">
                  {slide.subhead}
                </p>
                <Link href={slide.cta.href}>
                  <Button
                    size="lg"
                    variant="default"
                    className="shadow-xl text-lg"
                  >
                    {slide.cta.text}
                  </Button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #38bdf8;
        }
      `}</style>
    </div>
  );
}
