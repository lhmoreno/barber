import { CheckIcon, ClockIcon, XIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { SchedulingStatus as SchedulingStatusType } from "../helpers/convert-scheduling-status";

export function SchedulingStatus({ status }: { status: SchedulingStatusType }) {
  return (
    <Badge
      className={cn(
        "text-foreground",
        status === "confirmed" && "bg-green-200 hover:bg-green-200",
        status === "pending" && "bg-yellow-200 hover:bg-yellow-200",
        status === "canceled" && "bg-red-200 hover:bg-red-200",
        status === "rejected" && "bg-red-200 hover:bg-red-200"
      )}
    >
      {status === "confirmed" && (
        <>
          <CheckIcon className="mr-1 h-3 w-3" />
          Confirmado
        </>
      )}
      {status === "pending" && (
        <>
          <ClockIcon className="mr-1 h-3 w-3" />
          Pendente
        </>
      )}
      {status === "canceled" && (
        <>
          <XIcon className="mr-1 h-3 w-3" />
          Cancelado
        </>
      )}
      {status === "rejected" && (
        <>
          <XIcon className="mr-1 h-3 w-3" />
          Rejeitado
        </>
      )}
    </Badge>
  );
}
