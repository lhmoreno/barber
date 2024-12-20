import { z } from 'zod'

import { protectedProcedure } from '@/lib/trpc/root'

import {
  convertSchedulingStatus,
  SchedulingStatus,
} from '../helpers/convert-scheduling-status'

export const getSchedulings = protectedProcedure
  .input(
    z
      .object({
        page: z.number().min(1).optional(),
        status: z
          .enum<
            SchedulingStatus,
            Readonly<[SchedulingStatus, ...SchedulingStatus[]]>
          >(['confirmed', 'canceled'])
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
      : undefined
    const endDate = input?.range?.startDate ? input.range.endDate : undefined
    const status = input?.status
      ? convertSchedulingStatus.toDb(input.status)
      : undefined
    const page = input?.page ?? 1

    const show = 25

    const [count, prismaSchedulings] = await ctx.prisma.$transaction([
      ctx.prisma.scheduling.count({
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
          status: status,
        },
      }),
      ctx.prisma.scheduling.findMany({
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
          status: status,
        },
        include: {
          service: true,
          customer: true,
        },
        orderBy: {
          date: 'asc',
        },
        skip: show * (page - 1),
        take: show,
      }),
    ])

    const totalPages = Math.ceil(count / show)

    return {
      schedulings: prismaSchedulings.map((scheduling) => ({
        id: scheduling.id,
        date: scheduling.date.toISOString(),
        startTimeInMinutes: scheduling.startTimeInMinutes,
        endTimeInMinutes: scheduling.endTimeInMinutes,
        status: convertSchedulingStatus.toHttp(scheduling.status),
        customer: {
          name: scheduling.customer.name,
          whatsappNumber: scheduling.customer.whatsappNumber,
        },
        service: {
          id: scheduling.service.id,
          name: scheduling.service.name,
        },
      })),
      page,
      totalPages,
    }
  })
