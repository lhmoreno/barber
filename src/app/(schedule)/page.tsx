import { Badge } from "@/components/ui/badge";
import { showTimeDisplay } from "@/lib/helpers/show-time-display";
import { ArrowRightIcon, TimerIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-4">
      {[
        {
          id: "1",
          name: "Corte 1",
          timeInMinutes: 15,
        },
        {
          id: "2",
          name: "Corte 2",
          timeInMinutes: 25,
        },
        {
          id: "3",
          name: "Corte 3",
          timeInMinutes: 35,
        },
        {
          id: "4",
          name: "Corte 4",
          timeInMinutes: 45,
        },
      ].map((service) => (
        <Link
          href={`/${service.id}`}
          key={service.id}
          className="group flex items-center gap-2 rounded-md border p-4 transition-all hover:bg-muted"
        >
          <div className="flex-1 space-y-3">
            <h2 className="font-bold">{service.name}</h2>
            <Badge variant="outline">
              <TimerIcon className="mr-1 h-3 w-3" />
              {showTimeDisplay(25)}
            </Badge>
          </div>

          <ArrowRightIcon className="invisible h-5 w-5 text-muted-foreground group-hover:visible" />
        </Link>
      ))}
    </div>
  );
}
