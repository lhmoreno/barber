import { createTRPCRouter } from '@/lib/trpc/root'

import { changeSchedulingStatus } from './change-scheduling-status'
import { createPublicScheduling } from './create-public-scheduling'
import { getPublicScheduling } from './get-scheduling'
import { getSchedulings } from './get-schedulings'

export const schedulingRouter = createTRPCRouter({
  getAll: getSchedulings,
  changeStatus: changeSchedulingStatus,

  public: {
    get: getPublicScheduling,

    create: createPublicScheduling,
  },
})
