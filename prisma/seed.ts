import { PrismaClient } from '@prisma/client'

import { customers } from './constants/curtomers'
import { dateReplacements } from './constants/date-replacements'
import { schedulings } from './constants/schedulings'
import { services } from './constants/services'
import { weekDays } from './constants/week-days'

const prisma = new PrismaClient()

async function main() {
  await prisma.weekDay.deleteMany()
  await prisma.dateReplacement.deleteMany()
  await prisma.scheduling.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.service.deleteMany()

  // Fake User
  prisma.user.upsert({
    where: { email: 'seuze@email.com.br' },
    create: {
      email: 'seuze@email.com.br',
      name: 'José da Silva',

      barberShop: {
        create: {
          name: 'Barbearia do seu zé',
          slug: 'seu-ze',
          bio: 'Uma barbearia tradicional localizada no centro da cidade',
          weekDays: {
            createMany: {
              data: weekDays,
            },
          },
          services: {
            createMany: {
              data: services,
            },
          },
        },
      },
    },

    update: {},
  })

  // My BarberShop
  const { id: barberShopId } = await prisma.barberShop.update({
    where: { slug: 'lhmoreno' },
    data: {
      name: "Moreno Barber's",
      weekDays: {
        createMany: {
          data: weekDays,
        },
      },
      dateReplacements: {
        createMany: {
          data: dateReplacements,
        },
      },
      customers: {
        createMany: {
          data: customers,
        },
      },
      services: {
        createMany: {
          data: services,
        },
      },
    },
    select: {
      id: true,
    },
  })

  await prisma.scheduling.createMany({
    data: schedulings.map((scheduling) => ({
      ...scheduling,
      barberShopId,
    })),
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
