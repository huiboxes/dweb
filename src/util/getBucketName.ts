export default function getBucketName(path: string): string {
  return path.lastIndexOf('/')
    ? path.match(/\/(\S*)\//)[1].split('/')[0]
    : path.substr(1)
}
