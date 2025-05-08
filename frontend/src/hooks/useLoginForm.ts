import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/schemas/loginSchema";

export function useLoginForm() {
    return useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
      mode: "onChange",
      defaultValues: {
        email: "",
        password: "",
      },
    });
}