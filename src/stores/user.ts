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
    const userId = computed(() => userInfo.value?.id)
    return { userInfo, setUserInfo, userId }
  },
  {
    persist: {
      key: 'fc-userInfo'
    }
  }
)
