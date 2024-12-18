import { DrawerButton } from "@/components/drawer-button";
import { Icons } from "@/components/icons";
import { NavLinks } from "@/components/nav-links";
import { UserButton } from "@/components/user-button";
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
    <div className="lg:flex">
      <header className="bg-card flex items-center justify-between border-b px-4 py-1 lg:hidden">
        <DrawerButton />
        <Icons.logo className="h-6 w-28" />
        <UserButton short />
      </header>
      <div className="bg-card relative hidden min-h-screen w-56 border-r lg:block">
        <NavLinks className="fixed h-screen w-56 p-3" />
      </div>

      <div className="flex flex-1 p-4 pb-8 lg:p-8 lg:pb-16">{children}</div>
    </div>
  );
}
