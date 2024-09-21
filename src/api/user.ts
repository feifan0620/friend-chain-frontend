import request from '@/utils/request'
import qs from 'qs'
import type { User } from '@/models/user'

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

/**
 * @description 根据标签搜索用户
 * @param tags 标签
 * @returns Promise<User[]>
 */
export const searchUsersByTags = (tags: string[]) => {
  return request.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false })
    }
  })
}

/**
 * @description 更新用户信息
 * @param userInfo 用户信息
 * @returns Promise<User>
 */
export const updateUser = (userInfo: User) => {
  return request.post('/user/update', { ...userInfo })
}
