/**
 * 队伍leix
 */
export type Team = {
  id?: number
  name?: String // 房间名称
  description?: String // 房间描述
  maxNum?: number // 最大人数
  expireTime?: Date // 过期时间
  userId?: number // 创建人id
  status?: number // 队伍状态 0-公开 1-私有 2-加密
  password?: String // 房间密码
  createTime?: Date // 创建时间
}
