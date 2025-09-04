"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    setIsClient(true);
  }, []);

  useEffect(() => {
    // This effect runs after the component has "hydrated" on the client.
    if (isClient && !token) {
      router.replace("/login");
    }
  }, [isClient, token, router]);

  // While hydrating or if not authenticated, render nothing or a loader.
  if (!isClient || !token) {
    return null; // Or a loading spinner component
  }

  // If hydrated and authenticated, render the page content.
  return <>{children}</>;
}
