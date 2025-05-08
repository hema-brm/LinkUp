"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRegisterForm } from "@/hooks";
import { RegisterFormValues } from "@/schemas/registerSchema";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiClient } from "@/config/axios";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useRegisterForm();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await apiClient.post("/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      toast.success("Compte créé", {
        description: "Votre compte a été créé. Veuillez vous connecter.",
      });
  
      router.push("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Erreur lors de l'inscription", {
          description:
            error.response?.data?.message ||
            "Une erreur inattendue est survenue.",
        });
      } else {
        toast.error("Erreur inconnue", {
          description: "Une erreur inattendue est survenue.",
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center text-indigo-700">LinkUp</h1>
        <h2 className="text-xl font-semibold text-center">Créer un compte</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nom d'utilisateur" {...field} />
                  </FormControl>
                  <div className="min-h-[1.5rem]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <div className="min-h-[1.5rem]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mot de passe"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <div className="min-h-[1.5rem]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirmer le mot de passe"
                      {...field}
                    />
                  </FormControl>
                  <div className="min-h-[1.5rem]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={!form.formState.isValid}>
              S&apos;inscrire
            </Button>
          </form>
        </Form>

        <p className="text-sm text-center">
          Déjà inscrit ?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Se connecter
          </Link>
        </p>
      </Card>
    </div>
  );
}
