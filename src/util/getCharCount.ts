export default function getCharCount(str: string, char: string): number {
  const regex = new RegExp(char, 'g')
  const result = str.match(regex)
  const count = !result ? 0 : result.length
  return count
}
