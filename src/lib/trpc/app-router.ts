import { schedulingRouter } from "@/features/scheduling/api/router";
import { createCallerFactory, createTRPCRouter } from "./root";
import { serviceRouter } from "@/features/service/api/router";
import { availabilityRouter } from "@/features/availability/api/router";
import { infoRouter } from "@/features/info/api/router";

export const appRouter = createTRPCRouter({
  scheduling: schedulingRouter,
  service: serviceRouter,
  availability: availabilityRouter,
  info: infoRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
