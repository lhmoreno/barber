import type { Prisma } from '@prisma/client'
import dayjs from 'dayjs'

const dateNextMonday = dayjs().startOf('week').add(1, 'day')
const dateNextTuesday = dateNextMonday.add(1, 'day')

export const dateReplacements: Prisma.DateReplacementCreateManyBarberShopInput[] =
  [
    {
      date: dateNextMonday.toDate(),
      startTimeInMinutes: 540,
      endTimeInMinutes: 720,
    },
    {
      date: dateNextMonday.add(1, 'week').toDate(),
      startTimeInMinutes: 540,
      endTimeInMinutes: 720,
    },
    {
      date: dateNextMonday.add(2, 'week').toDate(),
      startTimeInMinutes: 540,
      endTimeInMinutes: 720,
    },
    {
      date: dateNextTuesday.toDate(),
      startTimeInMinutes: 0,
      endTimeInMinutes: 0,
    },
    {
      date: dateNextTuesday.add(1, 'week').toDate(),
      startTimeInMinutes: 0,
      endTimeInMinutes: 0,
    },
    {
      date: dateNextTuesday.add(2, 'week').toDate(),
      startTimeInMinutes: 0,
      endTimeInMinutes: 0,
    },
  ]
