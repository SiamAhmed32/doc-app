
"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

const FullPageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-slate-900">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
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

  const publicRoutes = ["/", "/login", "/register"];
  const isPublicRoute =
    publicRoutes.includes(pathname) || pathname.startsWith("/doctors/profile");
  const isProtectedRoute = !isPublicRoute;

  useEffect(() => {
    if (isClient && !token && isProtectedRoute) {
      router.replace("/login");
    }
  }, [isClient, token, router, isProtectedRoute, pathname]);

  if (!isClient || (isProtectedRoute && !token)) {
    return <FullPageLoader />;
  }

  return <>{children}</>;
}
