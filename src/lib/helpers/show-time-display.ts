export function showTimeDisplay(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const minutesRest = minutes % 60

  if (hours === 0) {
    return `${minutes} min`
  }

  if (minutesRest === 0) {
    return `${hours} h`
  }

  return `${hours} h ${minutesRest} min`
}
