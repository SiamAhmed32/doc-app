"use client";

import HeroSection from "@/components/homepage/HeroSection";
import AnnouncementBanner from "@/components/homepage/AnnouncementBanner";
import FeaturesGridSection from "@/components/homepage/FeaturesGridSection";
import HowItWorksSection from "@/components/homepage/HowItWorksSection";
import WhyChooseUsSection from "@/components/homepage/WhyChooseUsSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import StatsSection from "@/components/homepage/StatsSection";
import CallToActionBanner from "@/components/homepage/CallToActionBanner";
import TeamSection from "@/components/homepage/TeamSection";

export default function HomePage() {
  return (
    <>
      <AnnouncementBanner />
      <HeroSection />
      <FeaturesGridSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <StatsSection />
      <CallToActionBanner />
      <TeamSection />
    </>
  );
}
