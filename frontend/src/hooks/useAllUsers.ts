import { useEffect, useState } from "react";
import { apiClient } from "@/config/axios";
import { User } from '@/types/user'

export function useAllUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get<User[]>("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading };
}
