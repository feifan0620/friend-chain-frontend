import axios from 'axios'
import { Toast } from 'tdesign-mobile-vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

// 新建自定义 axios 实例
const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000
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
    const res = response.data
    if (res.code !== 200) {
      Toast.error(res.message)
      return Promise.reject(
        '\n错误码：' +
          res.code +
          '\n' +
          '错误信息：' +
          res.message +
          '\n' +
          '描述：' +
          res.data
      )
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
