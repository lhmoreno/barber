import { fakerPT_BR as faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'

export const servicesIds = [
  'cku1qeg8n000001hmds8yf7xo',
  'cku1qeg8n000101hm7dxu9fy2',
  'cku1qeg8n000201hmcb2x8hj3',
  'cku1qeg8n000301hm3vq7x9v4',
  'cku1qeg8n000401hmjyasxvzn5',
  'cku1qeg8n000501hm2aewx2qm6',
]

export const services: Prisma.ServiceCreateManyBarberShopInput[] = [
  {
    id: servicesIds[0],
    name: 'Corte de cabelo (social)',
    timeInMinutes: 20,
    description: faker.lorem.paragraph(),
  },
  {
    id: servicesIds[1],
    name: 'Corte de cabelo (degradê)',
    timeInMinutes: 25,
    description: faker.lorem.paragraph(),
  },
  {
    id: servicesIds[2],
    name: 'Barba',
    timeInMinutes: 15,
    description: faker.lorem.paragraph(),
  },
  {
    id: servicesIds[3],
    name: 'Corte de cabelo (gillette)',
    timeInMinutes: 25,
    description: faker.lorem.paragraph(),
  },
  {
    id: servicesIds[4],
    name: 'Desenho da Barba',
    timeInMinutes: 10,
    description: faker.lorem.paragraph(),
  },
  {
    id: servicesIds[5],
    name: 'Remover barba',
    timeInMinutes: 15,
    description: faker.lorem.paragraph(),
  },
]
