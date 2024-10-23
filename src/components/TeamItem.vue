<script lang="ts" setup>
import type { Team } from '@/models/team'
import { teamStatusEnum } from '@/constans/team'
import { ref } from 'vue'
import { Toast } from 'tdesign-mobile-vue'
import { joinTeam } from '@/api/team'

const props = defineProps({
  teamInfo: {
    type: Object as () => Team,
    default: {} as Team
  }
})

const confirmBtn = {
  content: '确认',
  variant: 'text',
  size: 'large'
}
const cancelBtn = {
  content: '取消',
  variant: 'text',
  size: 'large'
}

const isShowDialog = ref(false)

const password = ref('')

const onConfirm = () => {
  if (props.teamInfo.status === 0) {
    joinTeam(props.teamInfo.id).then(() => {
      Toast.success('加入成功')
    })
  } else {
    joinTeam(props.teamInfo.id, password.value)
      .then(() => {
        Toast.success('加入成功')
      })
      .catch((err) => {
        if (err === '用户已加入该队伍') {
          Toast.error(err.substring(2))
        }
      })
      .finally(() => {
        password.value = ''
      })
  }
}
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
          <t-tag
            variant="light"
            size="small"
            :theme="teamInfo.status === 0 ? 'success' : 'danger'"
          >
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
    <t-button
      size="extra-small"
      class="join-button"
      @click="isShowDialog = true"
      >加入队伍</t-button
    >
  </div>
  <t-dialog
    v-model:visible="isShowDialog"
    :title="teamInfo.status === 0 ? '提示' : '该队伍已加密'"
    :cancel-btn="cancelBtn"
    :confirm-btn="confirmBtn"
    @confirm="onConfirm"
  >
    <t-input
      v-if="teamInfo.status === 2"
      v-model="password"
      placeholder="请输入密码"
    />
    <span v-else>确定要加入该队伍吗？</span>
  </t-dialog>
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
.t-input {
  margin-top: 16px;
  --td-input-vertical-padding: 12px;
  --td-bg-color-container: var(--td-bg-color-page, #f3f3f3);
  border-radius: 6px;
}
</style>
