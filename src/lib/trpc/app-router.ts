import { availabilityRouter } from '@/features/availability/api/router'
import { barbershopRouter } from '@/features/barbershop/api/router'
import { schedulingRouter } from '@/features/scheduling/api/router'
import { serviceRouter } from '@/features/service/api/router'

import { createCallerFactory, createTRPCRouter } from './root'

export const appRouter = createTRPCRouter({
  scheduling: schedulingRouter,
  service: serviceRouter,
  availability: availabilityRouter,
  barbershop: barbershopRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
