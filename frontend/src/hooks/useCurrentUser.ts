import { useEffect, useState } from "react";
import { apiClient } from "@/config/axios";
import { User } from "@/types/user";

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/auth/me")
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch(() => {
        setCurrentUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { currentUser, loading };
}
