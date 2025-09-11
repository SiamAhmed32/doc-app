"use client";

import HeroSection from "@/components/homepage/HeroSection";
import FeaturesGridSection from "@/components/homepage/FeaturesGridSection";
import HowItWorksSection from "@/components/homepage/HowItWorksSection";
import WhyChooseUsSection from "@/components/homepage/WhyChooseUsSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import StatsSection from "@/components/homepage/StatsSection";
import CallToActionBanner from "@/components/homepage/CallToActionBanner";
import TeamSection from "@/components/homepage/TeamSection";
import FeaturedDoctorsSection from "@/components/homepage/FeaturedDoctorsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesGridSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <FeaturedDoctorsSection />
      <TestimonialsSection />
      <StatsSection />
      <CallToActionBanner />
      <TeamSection />
    </>
  );
}
