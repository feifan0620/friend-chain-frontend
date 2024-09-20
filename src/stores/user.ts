import { defineStore } from 'pinia'
import type { User } from '@/models/user'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<User>()
    const setUserInfo = async (user: User) => {
      userInfo.value = user
    }
    return { userInfo, setUserInfo }
  },
  {
    persist: {
      key: 'fc-userInfo'
    }
  }
)
