<script lang="ts" setup>
import type { Team } from '@/models/team'
import { teamStatusEnum } from '@/constans/team'
defineProps({
  teamInfo: {
    type: Object as () => Team,
    default: {} as Team
  }
})
</script>

<template>
  <div class="team-card">
    <div class="card-content">
      <t-image
        size="large"
        fit="cover"
        src="src/assets/天命人.webp"
        alt="队伍图片"
        class="team-image"
      />
      <div class="team-info">
        <span class="team-name">
          {{ teamInfo.name }}
          <t-tag variant="light" size="small" :theme="teamInfo.status === 0 ? 'success' : 'danger'">
            {{ teamStatusEnum[teamInfo.status] }}
          </t-tag>
        </span>
        <span class="team-description">{{ teamInfo.description }}</span>
        <span class="team-members">
          <t-icon size="14px" name="usergroup"></t-icon>
          {{ teamInfo.hasJoinNum }}/{{ teamInfo.maxNum }}
        </span>
        <span class="team-timestamp">
          <t-icon size="14px" name="time"></t-icon>
          {{ teamInfo.expireTime }}
        </span>
      </div>
    </div>
    <t-button size="extra-small" class="join-button">加入队伍</t-button>
  </div>
</template>

<style lang="less" scoped>
//.team-card::before {
//  content: '';
//  background-color: rgba(255, 255, 255, 0.8);
//  width: 100%;
//  height: 100%;
//  position: absolute;
//  left: 0;
//  top: 0;
//}
.team-card {
  position: relative;
  background: #fff;
  height: 140px;
  width: 95vw;
  margin: 12px auto;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  .card-content {
    flex: 1;
    display: flex;
    align-items: center;
    .team-image {
      width: 100px;
      height: 100%;
      border-radius: 5px;
      margin-right: 12px;
    }

    .team-info {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      .team-name {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
        line-height: 18px;
        //display: flex;
        //justify-content: space-between;
        //align-items: center;
      }
      .team-description {
        flex: 1;
        font-size: 14px;
        line-height: 18px;
        width: calc(100% - 5px);
        color: #666;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        white-space: normal;
      }
      .team-members,
      .team-timestamp {
        color: #999;
        font-size: 12px;
        line-height: 12px;
        margin-top: 8px;
        display: flex;
        align-items: center;
        .t-icon {
          margin-right: 4px;
        }
      }
    }
  }

  .join-button {
    align-self: end;
    margin-left: 10px;
    --td-button-default-bg-color: #1890ff;
    color: #fff;
  }
}
</style>
