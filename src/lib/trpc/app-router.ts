import { schedulingRouter } from "@/features/scheduling/api/router";
import { createCallerFactory, createTRPCRouter, publicProcedure } from "./root";
import { serviceRouter } from "@/features/service/api/router";
import { TRPCError } from "@trpc/server";
import { availabilityRouter } from "@/features/availability/api/router";

export const appRouter = createTRPCRouter({
  scheduling: schedulingRouter,
  service: serviceRouter,
  availability: availabilityRouter,

  barber: {
    public: {
      getInfo: publicProcedure.query(async ({ ctx }) => {
        const prismaInfo = await ctx.prisma.barberShop.findFirst();

        if (!prismaInfo) {
          throw new TRPCError({
            message: "Info not found.",
            code: "NOT_FOUND",
          });
        }

        return {
          name: prismaInfo.name,
          bio: prismaInfo.bio,
        };
      }),
    },
  },
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
