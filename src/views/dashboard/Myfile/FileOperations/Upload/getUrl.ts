import { ref, inject } from 'vue'
import Store from '@/store'

export default function() {
  const URL = ref('')
  const filePath: any = inject(Store.filePath)
  const paths =  filePath.value.split('/')
  const bucketName = paths[1]
  let key = '/' + paths.slice(2,paths.length-1).join('/') + '/'
  key = key === '//' ? '' : key
}
