import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsAuthenticated(!!token);
  }, []);

  return { isAuthenticated };
}
