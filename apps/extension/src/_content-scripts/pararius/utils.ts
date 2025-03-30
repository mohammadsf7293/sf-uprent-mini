export const getPropertyPlatformId = (path: string) => {
  const idRegex = /\/([0-9a-f]+)\/|contact\/([0-9a-f]+)-/
  const match = path.match(idRegex)?.[1] ?? path.match(idRegex)?.[2]
  if (!match) return null

  return `par_${match}`
}
