import request from '@/utils/request'

/**
 * @description 获取当前用户信息
 * @returns Promise<User>
 */
export const getCurrentUser = () => {
  return request.get('/user/current')
}

/**
 * @description 用户登录
 * @param userAccount 账号
 * @param userPassword 密码
 * @returns Promise<User>
 */
export const userLogin = (userAccount: string, userPassword: string) => {
  return request.post('/user/login', {
    userAccount,
    userPassword
  })
}
