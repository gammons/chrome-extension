export const formattedTime = (time: string): string => {
  const date = new Date(parseInt(time + "000"))
  return date.toLocaleString()
}

export const formattedXmlTime = (time: string): string => {
  const date = new Date(time)
  return date.toLocaleString()
}
