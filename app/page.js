"use client";

import HeroSection from "@/components/homepage/HeroSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import FeaturedDoctorsSection from "@/components/homepage/FeaturedDoctorsSection";
import WhyChooseUsSection from "@/components/homepage/WhyChooseUsSection";
import HowItWorksSection from "@/components/homepage/HowItWorksSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <FeaturedDoctorsSection />
    </>
  );
}
