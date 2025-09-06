"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import Header from "../layout/Header";

const FullPageLoader = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <div className="flex flex-grow items-center justify-center bg-white dark:bg-slate-900">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
    </div>
  </div>
);

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { token } = useSelector((state) => state.auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define which routes are always public
  const publicRoutes = ["/", "/login", "/register"];

  // A route is considered public if it's in our list OR if it's a doctor profile page.
  const isPublicRoute =
    publicRoutes.includes(pathname) || pathname.startsWith("/doctors/profile");

  const isProtectedRoute = !isPublicRoute;

  useEffect(() => {
    // Only redirect if we are on the client, the user has no token, AND it's a protected route.
    if (isClient && !token && isProtectedRoute) {
      router.replace("/login");
    }
  }, [isClient, token, router, isProtectedRoute]);

  // If it's a protected route and we're still verifying auth, show the loader.
  if (isProtectedRoute && (!isClient || !token)) {
    return <FullPageLoader />;
  }

  // Otherwise, render the page content.
  return <>{children}</>;
}
