import { defineStore } from 'pinia'
import type { User } from '@/models/user'
import { computed, ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<User>()
    // 推荐用户列表
    const recommendUsers = ref<User[]>([])
    // 设置推荐用户列表
    const setRecommendUsers = (newRecommendUsers: User[]) => {
      recommendUsers.value = newRecommendUsers
    }
    const setUserInfo = (newUserInfo: User) => {
      userInfo.value = { ...userInfo.value, ...newUserInfo }
    }
    const clearUserInfo = () => {
      userInfo.value = undefined
    }
    const userId = computed(() => userInfo.value?.id)
    return {
      userInfo,
      recommendUsers,
      userId,
      setUserInfo,
      setRecommendUsers,
      clearUserInfo
    }
  },
  {
    persist: {
      key: 'fc-userInfo'
    }
  }
)
