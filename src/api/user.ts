import request from '@/utils/request'

/**
 * @description 获取当前用户信息
 * @returns Promise<User>
 */
export const getCurrentUser = () => {
  return request.get('/user/current')
}
