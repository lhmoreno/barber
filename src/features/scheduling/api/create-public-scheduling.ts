import { publicProcedure } from "@/lib/trpc/root";

import { createPublicSchedulingSchema } from "../schemas/create-public-scheduling-schema";
import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";

export const createPublicScheduling = publicProcedure
  .input(createPublicSchedulingSchema)
  .mutation(async ({ ctx, input }) => {
    const prismaService = await ctx.prisma.service.findUnique({
      where: {
        id: input.serviceId,
      },
    });

    if (!prismaService) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Service not found.",
      });
    }

    const prismaScheduling = await ctx.prisma.scheduling.create({
      data: {
        startDate: input.startDate,
        endDate: dayjs(input.startDate)
          .add(prismaService.timeInMinutes, "minute")
          .toDate(),
        customerName: input.name,
        customerPhone: input.phoneNumber,
        status: "CONFIRMED",
        serviceId: input.serviceId,
      },
    });

    return { id: prismaScheduling.id };
  });
