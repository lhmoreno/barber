import { z } from "zod";

import { protectedProcedure } from "@/lib/trpc/root";

import {
  convertSchedulingStatus,
  SchedulingStatus,
} from "../helpers/convert-scheduling-status";

export const getSchedulings = protectedProcedure
  .input(
    z
      .object({
        page: z.number().min(1).optional(),
        status: z
          .enum<
            SchedulingStatus,
            Readonly<[SchedulingStatus, ...SchedulingStatus[]]>
          >(["confirmed", "canceled"])
          .optional(),
        range: z
          .object({
            startDate: z.string().datetime(),
            endDate: z.string().datetime().optional(),
          })
          .optional(),
      })
      .optional()
  )
  .query(async ({ ctx, input }) => {
    const startDate = input?.range?.startDate
      ? input.range.startDate
      : undefined;
    const endDate = input?.range?.startDate ? input.range.endDate : undefined;
    const status = input?.status
      ? convertSchedulingStatus.toDb(input.status)
      : undefined;
    const page = input?.page ?? 1;

    const show = 25;

    const [count, prismaSchedulings] = await ctx.prisma.$transaction([
      ctx.prisma.scheduling.count({
        where: {
          startDate: {
            gte: startDate,
          },
          endDate: {
            lte: endDate,
          },
          status: status,
        },
      }),
      ctx.prisma.scheduling.findMany({
        where: {
          startDate: {
            gte: startDate,
          },
          endDate: {
            lte: endDate,
          },
          status: status,
        },
        include: {
          service: true,
        },
        orderBy: {
          startDate: "asc",
        },
        skip: show * (page - 1),
        take: show,
      }),
    ]);

    const totalPages = Math.ceil(count / show);

    return {
      schedulings: prismaSchedulings.map((scheduling) => ({
        id: scheduling.id,
        startDate: scheduling.startDate.toISOString(),
        endDate: scheduling.endDate.toISOString(),
        status: convertSchedulingStatus.toHttp(scheduling.status),
        customer: {
          name: scheduling.customerName,
          phoneNumber: scheduling.customerPhone,
        },
        service: {
          id: scheduling.service.id,
          name: scheduling.service.name,
        },
      })),
      page,
      totalPages,
    };
  });
