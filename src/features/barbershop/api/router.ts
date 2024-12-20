import { createTRPCRouter } from '@/lib/trpc/root'

import { getBarbershop } from './get-barbershop'
import { getPublicBarbershop } from './get-public-barbershop'
import { updateBarbershop } from './update-barbershop'
import { removeLogo, uploadLogo } from './upload-logo'

export const barbershopRouter = createTRPCRouter({
  public: {
    get: getPublicBarbershop,
  },
  get: getBarbershop,
  update: updateBarbershop,
  updateLogo: uploadLogo,
  removeLogo: removeLogo,
})
