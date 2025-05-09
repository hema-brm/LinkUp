import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { apiClient } from "@/config/axios";

export function useAxiosInterceptor() {
  const router = useRouter();

  useEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      res => res,
      err => {
        const status = err.response?.status;
        const token = localStorage.getItem("jwt");

        if (status === 401 || !token) {
          localStorage.removeItem("jwt");
          toast.warning("Déconnecté", {
            description: "Veuillez vous connecter.",
          });
          router.push("/login");
        }

        return Promise.reject(err);
      }
    );

    return () => {
      apiClient.interceptors.response.eject(interceptor);
    };
  }, [router]);
}
