<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import UserItem from '@/components/UserItem.vue'
import { searchUsersByTags } from '@/api/user'
import { onMounted, type Ref, ref } from 'vue'
import type { User } from '@/models/user'

const router = useRouter()
const route = useRoute()

const { tags } = route.query

const userList: Ref<User[]> = ref([])

onMounted(async () => {
  const { data } = await searchUsersByTags(tags as string[])
  data.map((user: User) => {
    if (user.tags) {
      user.tags = JSON.parse(user.tags as any)
    }
  })
  userList.value = data
})
</script>

<template>
  <t-navbar class="search" title="伙伴匹配" left-arrow @left-click="router.back()" />

  <div class="user-list-container">
    <t-list class="user-list" v-if="userList.length > 0">
      <UserItem class="user-list-item" v-for="user in userList" :key="user.id" :user="user" />
    </t-list>

    <t-empty
      class="empty"
      v-else
      image="https://tdesign.gtimg.com/mobile/demos/empty1.png"
      description="暂无匹配用户"
    />
  </div>
</template>

<style scoped lang="less">
.search {
  z-index: 100;
}

.user-list-container {
  margin-top: var(--td-navbar-height, 48px);
  padding-top: 8px;
  height: calc(100vh - 48px);
  background-color: #f3f3f3;
  position: relative;
  .user-list {
    padding: 12px;
    .user-list-item {
      margin-bottom: 12px;
    }
  }

  .empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
