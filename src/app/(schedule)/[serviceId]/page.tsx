import { TimerIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { dayjs } from "@/lib/dayjs";
import { showTimeDisplay } from "@/lib/helpers/show-time-display";
import { SelectDateForm } from "@/features/scheduling/components/select-date-form";

export default async function ScheduleDateTime({
  params,
}: {
  params: { serviceId: string };
}) {
  console.log(params.serviceId);

  return (
    <div className="flex flex-col rounded-md border bg-card lg:flex-row">
      <div className="flex flex-col gap-3 border-b p-4 lg:max-w-56 lg:border-r">
        <h3 className="font-bold">{"Corte #"}</h3>
        <Badge className="w-fit" variant="outline">
          <TimerIcon className="mr-1 h-3 w-3" />
          {showTimeDisplay(25)}
        </Badge>
        <p className="mt-auto text-xs font-medium text-muted-foreground md:text-center">
          {dayjs.tz.guess()}
        </p>
      </div>
      <SelectDateForm serviceId={params.serviceId} unavailable={[0, 6]} />
    </div>
  );
}
