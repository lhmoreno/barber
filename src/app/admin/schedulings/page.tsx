import { Metadata } from "next";

import { SchedulingsList } from "@/features/scheduling/components/schedulings-list";

export const metadata: Metadata = {
  title: "Agendamentos | Barber",
};

export default async function Schedulings() {
  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Agendamentos</h2>
        <p className="text-muted-foreground">Gerencie seus agendamentos.</p>
      </div>

      <SchedulingsList />
    </div>
  );
}
