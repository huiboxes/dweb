import { message } from 'ant-design-vue'

export default function tips(status,str) {
  status == 200 ? message.success(`${str}成功`) : message.warning(`${str}失败`)
}
