import { getServerSession } from "@/features/auth/helpers/get-session";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mt-8 mx-auto w-full max-w-screen-lg space-y-8 p-4">
      {children}
    </div>
  );
}
