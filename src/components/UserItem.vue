<script setup lang="ts">
import type { User } from '@/models/user'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const router = useRouter()
const userStore = useUserStore()

const props = defineProps({
  user: {
    type: Object as () => User,
    default: {} as User
  }
})

const contactMe = () => {
  router.push({
    path: '/user/chat',
    query: {
      avatar: props.user.avatarUrl,
      name: props.user.username
    }
  })
}
</script>

<template>
  <div class="user-item">
    <div class="user-info">
      <t-avatar
        shape="round"
        class="user-avatar"
        :image="props.user.avatarUrl"
        size="80px"
      >
        {{ props.user.username?.substring(0, 2) || '用户' }}
      </t-avatar>
      <div class="user-info-right">
        <div class="user-nickname">{{ props.user.username || '用户' }}</div>
        <div class="user-tags">
          <t-tag
            v-if="props.user.gender === 0 || props.user.gender === 1"
            variant="light"
          >
            {{ props.user.gender === 0 ? '男' : '女' }}
            <span
              :class="
                props.user.gender === 0
                  ? 'iconfont icon-xingbie-nan'
                  : 'iconfont icon-xingbie-nv'
              "
            />
          </t-tag>
          <t-tag variant="light" v-for="tag in props.user.tags" :key="tag">{{
            tag
          }}</t-tag>
        </div>
        <div class="user-desc">
          <span>{{ props.user.profile || '这个人很神秘' }}</span>
        </div>
      </div>
    </div>
    <t-button
      v-if="props.user.username !== userStore.userInfo?.username"
      size="small"
      theme="light"
      class="contact-me-btn"
      @click="contactMe"
      >联系我</t-button
    >
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
    width: calc(100% - 68px);
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
        margin-bottom: 8px;
      }
      .user-tags {
        flex: 1;
        margin-bottom: 6px;
        overflow: hidden; /* 隐藏超出容器的内容 */
        white-space: nowrap;
        text-overflow: ellipsis;
        color: transparent;
        .t-tag {
          margin-right: 4px;
          font-size: 10px;
          color: #999999;
          .icon-xingbie-nan {
            color: #16a9fa;
            font-size: 10px;
          }
          .icon-xingbie-nv {
            color: #ff4d4f;
            font-size: 10px;
          }
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
