import { createTRPCRouter } from '@/lib/trpc/root'

import { getHours } from './get-hours'
import { getUnavailableDays } from './get-unavailable-days'

export const availabilityRouter = createTRPCRouter({
  public: {
    getUnavailableDays: getUnavailableDays,

    getHours: getHours,
  },
})
