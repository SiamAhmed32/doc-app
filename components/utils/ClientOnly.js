"use client";

import { useState, useEffect } from "react";

/**
 * A wrapper component that ensures its children are only rendered on the client side,
 * preventing hydration mismatch errors.
 */
export default function ClientOnly({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; 
  }

  return <>{children}</>;
}