import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { dayjs } from '@/lib/dayjs'
import { publicProcedure } from '@/lib/trpc/root'

export const getHours = publicProcedure
  .input(
    z.object({ date: z.string().datetime(), serviceId: z.string().cuid() })
  )
  .output(
    z.object({
      hours: z.array(z.number().positive()),
    })
  )
  .query(async ({ ctx, input }) => {
    const prismaService = await ctx.prisma.service.findUnique({
      where: {
        id: input.serviceId,
      },
    })

    if (!prismaService) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Service not found.',
      })
    }

    const dateInput = dayjs.utc(input.date).startOf('date')
    const dateNow = dayjs.utc()

    const prismaSchedulings = await ctx.prisma.scheduling.findMany({
      where: {
        date: {
          gte: dateInput.toDate(),
          lte: dateInput.endOf('date').toDate(),
        },
        status: { in: ['CONFIRMED'] },
      },
    })

    const availability = {
      startTimeInMinutes: 540,
      endTimeInMinutes: 1080,
    }

    if (dateInput.isSame(dateNow, 'date')) {
      const beforeMinutes = dateNow.hour() * 60 + dateNow.minute()

      if (beforeMinutes >= availability.endTimeInMinutes) return { hours: [] }

      if (beforeMinutes > availability.startTimeInMinutes) {
        const newStartMinutes = Math.ceil(beforeMinutes / 15) * 15

        availability.startTimeInMinutes = newStartMinutes
      }
    }

    const totalAvailableMinutes =
      availability.endTimeInMinutes - availability.startTimeInMinutes

    const posibilities = Math.floor(
      totalAvailableMinutes / prismaService.timeInMinutes
    )

    const possibleTimes = Array.from({ length: posibilities }).map(
      (_, i) =>
        availability.startTimeInMinutes + prismaService.timeInMinutes * i
    )

    const times = possibleTimes.filter((time) => {
      const isTimeBlocked = prismaSchedulings.some((scheduling) => {
        return (
          time + prismaService.timeInMinutes > scheduling.startTimeInMinutes &&
          time < scheduling.endTimeInMinutes
        )
      })

      return !isTimeBlocked
    })

    return {
      hours: times,
    }
  })
