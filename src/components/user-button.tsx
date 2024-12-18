"use client";

import { ChevronDown, ChevronUpIcon, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type UserButtonProps = {
  short?: boolean;
  className?: string;
  arrowTop?: boolean;
};

export function UserButton({ short, className, arrowTop }: UserButtonProps) {
  const [open, setOpen] = useState(false);

  const { data } = useSession();

  const user = data?.user;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn("w-full justify-between", short && "w-fit", className)}
          variant="ghost"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.image ?? undefined} />
              <AvatarFallback className="text-xs">
                {user?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!short && user?.name}
          </div>
          {arrowTop ? (
            <ChevronUpIcon className="text-muted-foreground h-4 w-4" />
          ) : (
            <ChevronDown className="text-muted-foreground h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 p-0">
        <DropdownMenuItem className="p-0">
          <Button
            className="text-muted-foreground w-full justify-start font-medium"
            variant="ghost"
            onClick={async () => {
              setOpen(false);
              await signOut();
            }}
          >
            <LogOut className="text-destructive h-4 w-4" /> Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
