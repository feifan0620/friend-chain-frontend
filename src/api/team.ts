import request from '@/utils/request'
import type { Team } from '@/models/team'

/**
 * @description 创建队伍
 * @param teamInfo 队伍信息
 * @returns 队伍id
 */
export const addTeam = (teamInfo: Team) => {
  return request.post('/team/add', {
    ...teamInfo
  })
}

/**
 * @description 获取队伍列表
 * @param teamQuery 队伍查询参数
 * @returns 队伍列表
 */
export const getTeamList = (teamQuery: any) => {
  return request.get('/team/list', {
    params: { ...teamQuery }
  })
}

/**
 * @description 加入队伍
 * @param teamId 队伍id
 * @param password 密码
 * @returns 加入结果
 */
export const joinTeam = (teamId: number, password?: string) => {
  return request.post('/team/join', {
    teamId,
    password
  })
}
