"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useLoginForm } from "@/hooks";
import { LoginFormValues } from "@/schemas/loginSchema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { apiClient } from "@/config/axios";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useLoginForm();
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await apiClient.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
  
      const token = response.data.token;
      localStorage.setItem("jwt", token);
  
      toast.success("Connexion réussie", {
        description: "Bienvenue sur LinkUp !",
      });
  
      router.push("/");
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Échec de la connexion", {
          description:
            error.response?.data?.message ?? "Vérifiez vos identifiants.",
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
        <h2 className="text-xl font-semibold text-center">Connexion</h2>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
                    </FormItem>
                )}
                />

                <Button type="submit" className="w-full" disabled={!form.formState.isValid}>
                    Se connecter
                </Button>
            </form>
        </Form>

        <p className="text-sm text-center">
          Pas encore inscrit ?{" "}
          <Link href="/register" prefetch className="text-indigo-600 hover:underline">
            Créer un compte
          </Link>
        </p>
      </Card>
    </div>
  );
}
