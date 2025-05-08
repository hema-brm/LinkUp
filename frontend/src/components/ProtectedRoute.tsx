"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return <p>Chargement...</p>;
  }

  return <>{children}</>;
}
