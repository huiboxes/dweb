export default function getBucketName(str: string): string {
  return str.match(/\/(\S*)\//)[1].split('/')[0]
}
