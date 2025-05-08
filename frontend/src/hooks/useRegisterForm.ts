import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, registerSchema } from "@/schemas/registerSchema";

export function useRegisterForm() {
    return useForm<RegisterFormValues>({
      resolver: zodResolver(registerSchema),
      mode: "onChange",
      defaultValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });
  }