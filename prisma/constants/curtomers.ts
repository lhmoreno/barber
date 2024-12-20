import { fakerPT_BR as faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'

export const customersIds = [
  'ckxy1l6gj0000jwrv91k0uwg7',
  'ckxy1l6gj0001jwrv3fi7kxd1',
  'ckxy1l6gj0002jwrvcwa2ry6g',
  'ckxy1l6gj0003jwrvh38r1r2z',
  'ckxy1l6gj0004jwrv8fnse7qb',
  'ckxy1l6gj0005jwrvotxv6lfh',
  'ckxy1l6gj0006jwrvy1ka9jsz',
  'ckxy1l6gj0007jwrvltgu93n0',
  'ckxy1l6gj0008jwrvcv6x2dn7',
  'ckxy1l6gj0009jwrv4jd29vpf',
  'ckxy1l6gj000ajwrv2ngfrpk8',
  'ckxy1l6gj000bjwrvc0v7lf21',
  'ckxy1l6gj000cjwrvotybuhql',
  'ckxy1l6gj000djwrv3d1tcnzb',
  'ckxy1l6gj000ejwrvbm5h2r8m',
  'ckxy1l6gj000fjwrvd5vfpl07',
  'ckxy1l6gj000gjwrvgxzj9b32',
  'ckxy1l6gj000hjwrv4f1q27mn',
  'ckxy1l6gj000ijwrvpmb7wcz4',
  'ckxy1l6gj000jjwrvyl4gxtkp',
  'ckxy1l6gj000kjwrvq7kg2zt6',
  'ckxy1l6gj000ljwrvydr8wslb',
  'ckxy1l6gj000mjwrvmj3y8kn1',
  'ckxy1l6gj000njwrvs5cb34ow',
  'ckxy1l6gj000ojwrvvc4gzvly',
  'ckxy1l6gj000pjwrvjbg5r3fa',
  'ckxy1l6gj000qjwrv93xsm9dk',
  'ckxy1l6gj000rjwrvk2b9rpwt',
  'ckxy1l6gj000sjwrvt9qly8ug',
  'ckxy1l6gj000tjwrvkwczd7qv',
  'ckxy1l6gj000ujwrvqkrj62fo',
  'ckxy1l6gj000vjwrv2c7yh3gn',
  'ckxy1l6gj000wjwrvg8t4z91b',
  'ckxy1l6gj000xjwrvot5kmnlz',
  'ckxy1l6gj000yjwrv13fdx9r5',
  'ckxy1l6gj000zjwrvwvq4gb3u',
  'ckxy1l6gj0010jwrvqj5mpj86',
  'ckxy1l6gj0011jwrv8y6twzcf',
  'ckxy1l6gj0012jwrvkp1ctyhv',
  'ckxy1l6gj0013jwrvmwxvgf82',
  'ckxy1l6gj0014jwrv6rh1p04o',
  'ckxy1l6gj0015jwrv56kql9jf',
  'ckxy1l6gj0016jwrvwv2nphys',
  'ckxy1l6gj0017jwrv7gfryjmn',
  'ckxy1l6gj0018jwrv6bny8pzt',
  'ckxy1l6gj0019jwrvq9tkvgul',
]

export const customers: Prisma.CustomerCreateManyBarberShopInput[] = Array.from(
  {
    length: customersIds.length,
  }
).map((_, index) => {
  const hasWhatsappNumber = faker.datatype.boolean({ probability: 0.8 })
  const hasObservations = faker.datatype.boolean({ probability: 0.3 })

  return {
    id: customersIds[index],
    name: faker.person.fullName({ sex: 'male' }),
    whatsappNumber: hasWhatsappNumber
      ? faker.phone.number({ style: 'national' })
      : null,
    observations: hasObservations ? faker.lorem.paragraph() : null,
  }
})
