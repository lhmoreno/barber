import 'dayjs/locale/pt-br'

import lib from 'dayjs'
import dayjsTimezone from 'dayjs/plugin/timezone'
import dayjsUtc from 'dayjs/plugin/utc'

lib.extend(dayjsUtc)
lib.extend(dayjsTimezone)
lib.locale('pt-br')

export const dayjs = lib
