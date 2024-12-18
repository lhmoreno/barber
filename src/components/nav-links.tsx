"use client";

import { CalendarIcon, HardHatIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Icons } from "./icons";
import { UserButton } from "./user-button";

type NavLinksProps = {
  className?: string;
};

export function NavLinks({ className }: NavLinksProps) {
  const pathname = usePathname();
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <Icons.logo className="mx-auto mt-4 h-6 w-28" />

      <nav className="flex-1 space-y-2">
        <Button
          className={cn(
            "text-muted-foreground w-full justify-start font-medium",
            pathname === "/admin/schedulings" && "text-foreground"
          )}
          variant={pathname === "/admin/schedulings" ? "secondary" : "ghost"}
          asChild
        >
          <Link href="/admin/schedulings">
            <CalendarIcon className="h-4 w-4" /> Agendamentos
          </Link>
        </Button>
        <Button
          className={cn(
            "text-muted-foreground w-full justify-start font-medium",
            pathname.startsWith("/admin/services") && "text-foreground"
          )}
          variant={
            pathname.startsWith("/admin/services") ? "secondary" : "ghost"
          }
          asChild
        >
          <Link href="/admin/services">
            <HardHatIcon className="h-4 w-4" /> Serviços
          </Link>
        </Button>
        <Button
          className={cn(
            "text-muted-foreground w-full justify-start font-medium",
            pathname.startsWith("/admin/config") && "text-foreground"
          )}
          variant={pathname.startsWith("/admin/config") ? "secondary" : "ghost"}
          asChild
        >
          <Link href="/admin/config">
            <SettingsIcon className="h-4 w-4" /> Configurações
          </Link>
        </Button>
      </nav>

      <UserButton className="hidden lg:flex" arrowTop />
    </div>
  );
}
