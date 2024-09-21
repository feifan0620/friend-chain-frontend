import { defineStore } from 'pinia'
import type { User } from '@/models/user'
import { computed, ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<User>()
    const setUserInfo = (newUserInfo: User) => {
      userInfo.value = { ...userInfo.value, ...newUserInfo }
    }
    const clearUserInfo = () => {
      userInfo.value = undefined
    }
    const userId = computed(() => userInfo.value?.id)
    return { userInfo, setUserInfo, userId, clearUserInfo }
  },
  {
    persist: {
      key: 'fc-userInfo'
    }
  }
)
