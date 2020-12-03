export default function fixedDir(fileName: string): string {
  const dirs = fileName.split('/')
  return dirs[dirs.length-2] + '/'
}
