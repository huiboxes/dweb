export default function getBucketName(str: string): string[] {
  const newStr = str.split('/')
  
  newStr.shift()
  newStr.pop()
  return newStr
}
