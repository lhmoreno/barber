import { fakerPT_BR as faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.scheduling.deleteMany();
  await prisma.service.deleteMany();
  await prisma.barberShop.deleteMany();

  await prisma.barberShop.create({
    data: {
      name: "Barbearia do seu zé",
      bio: "Uma barbearia tradicional localizada no centro da cidade",
    },
  });

  const prismaServices = await prisma.service.createManyAndReturn({
    data: [
      {
        name: "Corte de cabelo (social)",
        timeInMinutes: 20,
      },
      {
        name: "Corte de cabelo (degradê)",
        timeInMinutes: 25,
      },
      {
        name: "Corte de cabelo (gillette)",
        timeInMinutes: 25,
      },
      {
        name: "Desenho da Barba",
        timeInMinutes: 10,
      },
      {
        name: "Remover barba",
        timeInMinutes: 15,
      },
    ],
  });

  await prisma.scheduling.createMany({
    data: Array.from({ length: 300 }).map(() => {
      const service = faker.helpers.arrayElement(prismaServices);

      const startDate = dayjs(
        faker.date.between({
          from: dayjs().subtract(15, "day").toISOString(),
          to: dayjs().add(15, "day").toISOString(),
        })
      ).toDate();

      const endDate = dayjs(startDate)
        .add(service.timeInMinutes, "minute")
        .toDate();

      return {
        startDate,
        endDate,
        serviceId: service.id,
        status: faker.datatype.boolean() ? "CONFIRMED" : "CANCELED",
        customerName: faker.person.fullName(),
        customerPhone: faker.phone.number(),
      };
    }),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
