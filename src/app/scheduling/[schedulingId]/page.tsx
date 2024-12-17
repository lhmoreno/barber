import {
  CalendarIcon,
  CircleDotIcon,
  ClockIcon,
  HardHatIcon,
  UserIcon,
} from "lucide-react";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { SchedulingStatus } from "@/features/scheduling/components/scheduling-status";
import { dayjs } from "@/lib/dayjs";
import { convertMinutesToTime } from "@/lib/helpers/minutes";

export const metadata: Metadata = {
  title: "Agendamento realizado | AgendaChat",
};

export default async function Scheduling({
  params,
}: {
  params: { schedulingId: string };
}) {
  return (
    <div className="p-4">
      <div className="mx-auto mt-4 w-full max-w-screen-sm rounded-lg border p-6">
        <div className="flex flex-col items-center text-center">
          {/* <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-200">
            <CheckIcon className="h-5 w-5 text-green-700" />
          </div> */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
            <ClockIcon className="h-5 w-5 text-yellow-600" />
          </div>
          <h1 className="mt-4 text-lg font-bold">Agendamento realizado</h1>
          <p className="text-muted-foreground">
            Enviamos um e-mail para você e para os outros participantes com um
            convite de calendário com todos os detalhes.
          </p>
        </div>

        <div className="my-6 h-[1px] bg-muted-foreground/25" />

        <div className="space-y-6">
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <p className="font-medium">Data</p>
            </div>
            <div className="text-end">
              <p className="font-medium">
                {dayjs().format("D [de] MMMM [de] YYYY[,] dddd")}
              </p>
              <p className="text-muted-foreground">{`${convertMinutesToTime(
                540
              )} - ${convertMinutesToTime(565)}`}</p>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <HardHatIcon className="h-4 w-4" />
              <p className="font-medium">Serviço</p>
            </div>
            <p className="text-end font-medium">{"Barbearia"}</p>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <UserIcon className="h-4 w-4" />
              <p className="font-medium">Solicitante</p>
            </div>
            <div className="text-end">
              <p className="font-medium">{"Claudio Pereira"}</p>
              <p className="text-muted-foreground">{"xxxxxxxxx"}</p>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CircleDotIcon className="h-4 w-4" />
              <p className="font-medium">Status</p>
            </div>

            <SchedulingStatus status={"confirmed"} />
          </div>
        </div>

        <div className="my-6 h-[1px] bg-muted-foreground/25" />

        <div className="flex flex-col items-center justify-center gap-3">
          <p className="font-medium">Deseja alterar?</p>
          <div className="space-x-4">
            <Button variant="destructive">Cancelar</Button>
            <Button variant="outline">Reagendar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
