import { dayjs } from "../dayjs";

export function convertToLocalMinutes(utcMinutes: number) {
  return utcMinutes + dayjs().utcOffset();
}

export function convertMinutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const minutesRest = minutes % 60;

  return `${hours.toString().padStart(2, "0")}:${minutesRest
    .toString()
    .padStart(2, "0")}`;
}
