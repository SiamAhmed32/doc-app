"use client";

import { useState } from "react";
import AnnouncementBanner from "@/components/homepage/AnnouncementBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ClientAppShell({ children }) {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <>
      <AnnouncementBanner
        onClose={() => setBannerVisible(false)}
        visible={bannerVisible}
      />
      <div className="flex min-h-screen flex-col">
        <Header bannerVisible={bannerVisible} />
        <main className="flex-grow pt-[84px]">{children}</main>
        <Footer />
      </div>
    </>
  );
}
