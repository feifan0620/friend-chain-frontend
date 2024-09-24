import axios from 'axios'
import { Toast } from 'tdesign-mobile-vue'
import { useUserStore } from '@/stores/user'

// 新建自定义 axios 实例
const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000
})

// 携带请求凭证(cookie)
instance.defaults.withCredentials = true

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    Toast.loading({
      message: '请稍候...',
      duration: 0
    })
    // const token = store.getters.token
    // if (token) {
    //   config.headers['Access-Token'] = token
    // }
    // config.headers.platform = 'H5'
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  async function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // axios 会对响应数据多封装一层 data
    const res = response.data
    if (res.code !== 200) {
      if (res.code === 40100 && res.code === 40101) {
        const userStore = useUserStore()
        userStore.clearUserInfo()
      }
      if (res.description) {
        Toast.error(res.description)
        return Promise.reject(res.description)
      } else {
        Toast.error(res.message)
        return Promise.reject(res.message)
      }
    } else {
      Toast.clear()
    }
    return res
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
