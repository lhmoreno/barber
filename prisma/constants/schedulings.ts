import { fakerPT_BR as faker } from '@faker-js/faker'
import type { $Enums, Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import { customersIds } from './curtomers'
import { servicesIds } from './services'

const dateMonthNow = dayjs().startOf('month')
const dateMonthNowBefore = dayjs().subtract(1, 'month').startOf('month')
const dateMonthNowAfter = dayjs().add(1, 'month').startOf('month')

const startMinutes = [540, 550, 560, 570, 580, 590]
const endMinutes = [600, 610, 620, 630, 640, 650]

const totalSchedulings = 155
const totalSchedulingsBefore = Math.floor(totalSchedulings * 0.2)
const totalSchedulingsAfter = Math.floor(totalSchedulings * 0.7)

export const schedulings: Prisma.SchedulingCreateManyBarberShopInput[] =
  Array.from({ length: totalSchedulings }).map((_, index) => {
    let fromDate = dateMonthNowBefore

    if (index > totalSchedulingsBefore && totalSchedulingsAfter > index) {
      fromDate = dateMonthNow
    }

    if (index > totalSchedulingsAfter) {
      fromDate = dateMonthNowAfter
    }

    const date = dayjs(
      faker.date.between({
        from: fromDate.toISOString(),
        to: fromDate.endOf('month').toISOString(),
      })
    ).toDate()

    const status = faker.helpers.arrayElement<$Enums.SchedulingStatus>([
      'CONFIRMED',
      'CANCELED',
    ])

    return {
      date,
      status,
      customerId: faker.helpers.arrayElement(customersIds),
      serviceId: faker.helpers.arrayElement(servicesIds),
      customerMessage: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      observations: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      startTimeInMinutes: faker.helpers.arrayElement(startMinutes),
      endTimeInMinutes: faker.helpers.arrayElement(endMinutes),
    }
  })
