import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/features/auth/components/login-form";
import { getServerSession } from "@/features/auth/helpers/get-session";

export const metadata: Metadata = {
  title: "Login | Barber",
};

export default async function Login() {
  const session = await getServerSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center p-4">
      <div className="mx-auto w-full max-w-sm">
        <div className="space-y-8">
          <h1 className="text-center text-2xl font-bold">Entre na sua conta</h1>
          <div className="border-border bg-card rounded-md border p-4 md:p-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
