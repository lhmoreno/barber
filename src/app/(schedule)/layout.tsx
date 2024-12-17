import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8 mx-auto w-full max-w-screen-lg space-y-8 p-4">
      <div className="flex flex-col items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={"https://pt.pngtree.com/free-png-vectors/barber-shop-logo"}
          />
          <AvatarFallback>
            {"Barbearia".slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className="mt-3 text-2xl font-bold">{"Barbearia"}</h2>
        <p className="text-muted-foreground">{"Descrição qualquer"}</p>
      </div>

      {children}
    </div>
  );
}
