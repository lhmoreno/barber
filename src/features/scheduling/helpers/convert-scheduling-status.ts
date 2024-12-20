import { $Enums } from '@prisma/client'

export type SchedulingStatus = 'confirmed' | 'canceled'
export type SchedulingStatusDb = $Enums.SchedulingStatus

export const convertSchedulingStatus = {
  toDb(status: SchedulingStatus) {
    return status.toUpperCase() as SchedulingStatusDb
  },
  toHttp(status: SchedulingStatusDb) {
    return status.toLocaleLowerCase() as SchedulingStatus
  },
}
