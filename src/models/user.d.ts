/**
 * 用户类型
 */
export type User = {
  id: number
  username: string
  userAccount?: string
  avatarUrl?: string
  gender?: number
  userPassword?: string
  tags?: string[]
  phone?: string
  email?: string
  userStatus?: number
  createTime?: date
  userRole?: number
  userCode?: string
}
