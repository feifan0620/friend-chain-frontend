<script setup lang="ts">
import type { User } from '@/models/user'
import { Dialog } from 'tdesign-mobile-vue'

const props = defineProps({
  user: {
    type: Object as () => User,
    default: {}
  }
})

const contactMe = () => {
  Dialog.confirm({
    title: '提示',
    content: '该功能暂未实现，请通过其他方式联系',
    confirmBtn: '确定'
  })
}
</script>

<template>
  <div class="user-item">
    <div class="user-info">
      <t-avatar shape="round" class="user-avatar" :image="props.user.avatarUrl" size="80px">
        {{ props.user.username?.substring(0, 1) || '用户' }}
      </t-avatar>
      <div class="user-info-right">
        <div class="user-nickname">{{ props.user.username || '用户' + props.user.userCode }}</div>
        <div class="user-tags">
          <t-tag variant="light" v-for="tag in props.user.tags" :key="tag">{{ tag }}</t-tag>
        </div>
        <div class="user-desc">
          <span>{{ props.user.profile || ' 暂无简介' }}</span>
        </div>
      </div>
    </div>
    <t-button size="small" theme="light" class="contact-me-btn" @click="contactMe">联系我</t-button>
  </div>
</template>

<style scoped>
.user-item {
  width: 100%;
  height: 108px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  position: relative;
  .user-info {
    width: calc(100% - 78px);
    display: flex;
    .user-avatar {
      margin-right: 8px;
      align-self: center;
    }
    .user-info-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: calc(100% - 96px);
      margin-right: 8px;
      .user-nickname {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 6px;
      }
      .user-tags {
        margin-bottom: 6px;
        overflow: hidden; /* 隐藏超出容器的内容 */
        white-space: nowrap;
        text-overflow: ellipsis;
        color: transparent;
        .t-tag {
          margin-right: 4px;
          font-size: 10px;
          color: #999999;
        }
      }
      .user-desc {
        white-space: nowrap;
        overflow: hidden; /* 隐藏超出容器的内容 */
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        font-size: 14px;
        color: #bbb;
      }
    }
  }
  .contact-me-btn {
    align-self: center;
    position: absolute;
    right: 12px;
  }
}
</style>
