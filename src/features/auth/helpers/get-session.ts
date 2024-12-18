import { getServerSession as getNextAuthSession } from 'next-auth'

import { options } from '../options'

export const getServerSession = () => getNextAuthSession(options)
