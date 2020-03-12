import axios from 'axios'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://zhongkeruitong.top/towerImg/search_lu/', // api的base_url
  timeout: 100000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  // config['headers']['Content-Type'] = 'application/json'
  config['headers']['Content-Type'] = 'application/x-www-form-urlencoded'
  if (config.method === 'POST' || config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  Promise.reject(error)
  console.info(error)
})
export default service
