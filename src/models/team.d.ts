import type { User } from '@/models/user'

/**
 * 队伍类型定义
 */
export type Team = {
  id: number // 队伍 ID
  name: string // 队伍名称
  description: string // 队伍描述
  expireTime: Date // 过期时间
  maxNum: number // 最大人数
  password?: string // 密码
  status: number // 状态
  createTime?: Date // 创建时间
  createUser?: User // 创建用户
  hasJoinNum?: number // 已加入人数
}
