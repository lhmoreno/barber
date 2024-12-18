"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const password = formData.get("password")?.toString() ?? "";

    const response = await signIn("credentials", { password, redirect: false });

    if (!response) {
      alert("Erro desconhecido (500)");
      return;
    }

    if (!response.ok) {
      setIsError(true);
    }

    router.push("/admin");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Senha de administrador"
        />
        {isError && (
          <span className="text-destructive text-sm">Senha inválida</span>
        )}
      </div>
      <Button type="submit" className="w-full">
        Entrar
      </Button>
    </form>
  );
}
