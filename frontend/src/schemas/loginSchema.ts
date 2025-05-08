import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;