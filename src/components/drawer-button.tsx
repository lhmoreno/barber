"use client";

import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { NavLinks } from "./nav-links";

export function DrawerButton() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <MenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-card w-56">
        <SheetHeader className="hidden">
          <SheetTitle>Menu de acesso</SheetTitle>
          <SheetDescription>
            Todos os links de acesso de nossa plataforma.
          </SheetDescription>
        </SheetHeader>
        <NavLinks className="mt-4" />
      </SheetContent>
    </Sheet>
  );
}
