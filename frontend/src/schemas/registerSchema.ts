import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
    .string()
    .min(2, "Le nom d'utilisateur est requis")
    .regex(/^[a-zA-Z0-9_-]+$/, "Uniquement lettres, chiffres, tirets ou underscore")
    .refine((val) => !val.includes(" "), {
      message: "Le nom d'utilisateur ne doit pas contenir d'espaces",
    }),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;