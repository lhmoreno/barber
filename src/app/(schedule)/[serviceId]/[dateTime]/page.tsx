import { CalendarIcon } from "lucide-react";

import { ScheduleForm } from "@/features/scheduling/components/schedule-form";
import { dayjs } from "@/lib/dayjs";
import { convertMinutesToTime } from "@/lib/helpers/minutes";

export default async function ScheduleDateTime({
  params,
}: {
  params: { serviceId: string; dateTime: string };
}) {
  const dateTime = decodeURIComponent(params.dateTime);
  const startTime = dayjs(dateTime).hour() * 60 + dayjs(dateTime).minute();
  const endTime = startTime + 25;

  return (
    <div className="mx-auto flex max-w-screen-md flex-col rounded-md border bg-card md:flex-row">
      <div className="flex w-full flex-col gap-3 border-b p-4 md:max-w-64 md:border-r">
        <h3 className="font-bold">{"Corte #"}</h3>
        <div className="space-y-2">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">
              {dayjs(dateTime).format("D [de] MMMM [de] YYYY[,] dddd")}
            </p>
            <p className="text-sm text-muted-foreground">{`${convertMinutesToTime(
              startTime
            )} - ${convertMinutesToTime(endTime)}`}</p>
          </div>
        </div>
        <p className="mt-auto text-xs font-medium text-muted-foreground md:text-center">
          {dayjs.tz.guess()}
        </p>
      </div>
      <ScheduleForm
        dateTime={dateTime}
        service={{
          id: "1",
          name: "Corte #",
          timeInMinutes: 25,
        }}
      />
    </div>
  );
}
