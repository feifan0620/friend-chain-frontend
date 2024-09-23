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
