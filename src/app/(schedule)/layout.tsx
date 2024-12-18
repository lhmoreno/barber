import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/lib/trpc/api-server";

export default async function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { name, bio, logoUrl } = await api.info.public.get();

  return (
    <div className="mt-8 mx-auto w-full max-w-screen-lg space-y-8 p-4">
      <div className="flex flex-col items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src={logoUrl ?? undefined} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h2 className="mt-3 text-2xl font-bold">{name}</h2>
        <p className="text-muted-foreground">{bio}</p>
      </div>

      {children}
    </div>
  );
}
