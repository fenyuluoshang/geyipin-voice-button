export function rendomCode(length: number) {
  const strs: string[] = []

  for (let i = 0; i < length; i++) {
    const num = Math.floor(Math.random() * 10)
    strs.push(num.toString())
  }
  return strs.join('')
}
