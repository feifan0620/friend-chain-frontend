<script setup lang="ts">
import UserItem from '@/components/UserItem.vue'
import { h, onMounted, type Ref, ref } from 'vue'
import { getMatchUser, recommendUsers } from '@/api/user'
import type { User } from '@/models/user'
import { InfoCircleFilledIcon } from 'tdesign-icons-vue-next'
const userIcon = () => h(InfoCircleFilledIcon)
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

// 最大数据长度
let MAX_DATA_LEN = 50
// 每次加载的数量
let ONCE_LOAD_NUM = 10
// 当前数据页码
let pageNum = 1

// 用户列表数据
const userList: Ref<Array<User>> = ref([] as Array<User>)
// 加载状态
const loading = ref('')

/**
 * 异步加载推荐用户数据函数
 * @param data 绑定的数据对象，用于更新推荐用户列表
 * 如果用户信息存在（已登录），则请求推荐用户数据，并将结果添加到数据对象的推荐用户列表中
 */
const loadData = async (data: any) => {
  // 检查用户信息是否存在，存在则继续加载推荐用户
  if (userStore.userInfo) {
    // 调用推荐用户API，获取推荐用户数据
    const res = (await recommendUsers(ONCE_LOAD_NUM, pageNum)) as any
    // 提取用户列表数据
    const userList = res.data.records
    // 处理每个用户的标签信息，将其从字符串解析为对象
    userList.map((item: User) => {
      if (item.tags) {
        return (item.tags = JSON.parse(item.tags as any))
      }
    })
    // 将处理后的用户列表存储到用户 store 的推荐用户列表中
    userStore.setRecommendUsers(userList)
  }
  // 将用户 store (缓存)中的推荐用户列表添加到数据对象中
  data.value.push(...userStore.recommendUsers)
  // 递增页码，用于下一次加载更多数据
  pageNum++
}

/**
 * 当用户尝试上拉加载更多数据时调用此函数
 *
 * 此函数的目的是在用户上拉操作时判断是否满足加载更多数据的条件，如果满足，则触发数据加载操作
 * 它通过检查现有数据量是否达到最大数据长度限制或者是否有正在进行的加载任务来决定是否加载更多数据
 */
const onLoadPull = () => {
  // 检查数据量是否已达到上限或是否有正在进行的加载任务
  if (userList.value.length >= MAX_DATA_LEN || loading.value) {
    return
  }
  // 设置加载状态指示符，防止重复加载
  loading.value = 'loading'
  // 调用加载数据函数，并在加载完成后重置加载状态
  loadData(userList).then(() => {
    loading.value = ''
  })
}

/**
 * 当列表组件滚动时调用此函数
 *
 * 此函数的目的是在用户滚动列表时判断是否触发加载更多数据的操作，它通过检测用户是否接近滚动底部来决定
 * @param {number} scrollBottom - 表示当前列表底部距离窗口底部的距离（单位：像素）
 */
const onScroll = (scrollBottom: number) => {
  // 当用户接近列表底部时，触发加载更多数据操作
  if (scrollBottom < 10) {
    onLoadPull()
  }
}

// 页面挂在完成时加载推荐用户列表
onMounted(async () => {
  onLoadPull()
})

// 通知消息数据
const content = ref([
  '友链内测版全新上线，欢迎各位同学体验！',
  '队伍功能已上线，快来组建自己的团队吧!'
])
// 轮播图数据
const swiperList = [
  'src/assets/acm.webp',
  'src/assets/MAKERS游戏开发大赛.webp',
  'src/assets/华为开发者大赛.webp',
  'src/assets/智能交互创新赛.webp',
  'src/assets/蓝桥杯.webp'
]

const handleSwiperClick = (value: number) => {
  console.log('click: ', value)
}

/**
 * 切换心动模式开关时触发的事件
 */
const switchChecked = ref(false)
const matchCount = 10
const onSwitchChange = async () => {
  if (switchChecked.value) {
    const { data: matchUsers } = await getMatchUser(matchCount)
    matchUsers.map((item: User) => {
      if (item.tags) {
        return (item.tags = JSON.parse(item.tags as any))
      }
    })
    userList.value = matchUsers
    MAX_DATA_LEN = matchCount
  } else {
    userList.value = []
    MAX_DATA_LEN = 50
    pageNum = 1
    onLoadPull()
  }
}
</script>

<template>
  <div class="home">
    <div class="banner">
      <t-swiper
        :navigation="{ type: 'dots' }"
        interval="3000"
        autoplay
        @click="handleSwiperClick"
      >
        <t-swiper-item
          v-for="(item, index) in swiperList"
          :key="index"
          style="height: 26vh"
        >
          <img :src="item" class="img" />
        </t-swiper-item>
      </t-swiper>
    </div>
    <t-notice-bar visible marquee :content="content" direction="vertical">
      <template #prefixIcon>
        <t-icon name="sound"></t-icon>
      </template>
    </t-notice-bar>
    <t-cell class="match-user" title="心动模式">
      <template #rightIcon>
        <t-switch v-model="switchChecked" @change="onSwitchChange"></t-switch>
      </template>
    </t-cell>
    <div class="user-list-container">
      <t-list
        v-if="userList.length > 0"
        class="user-list"
        :async-loading="loading"
        @scroll="onScroll"
      >
        <UserItem
          class="user-list-item"
          v-for="item in userList"
          :key="item.id"
          :user="item"
        />
        <t-back-top />
      </t-list>
      <t-empty
        v-if="userStore.recommendUsers.length === 0"
        class="empty"
        :icon="userIcon"
        description="无法获取用户列表"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  padding-bottom: 56px;
  padding-top: 48px;
  background-color: #f3f3f3;
  .search {
    z-index: 100;
  }
  .banner {
    --td-swiper-border-radius: 0px;
    height: 26vh;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .match-user {
    height: 55px;
  }
  //.card {
  //  padding: 12px;
  //  width: 100%;
  //  height: 120px;
  //  display: flex;
  //  justify-content: space-between;
  //  .join {
  //    width: 45%;
  //    height: 90%;
  //    border-radius: 10px;
  //    color: #fff;
  //    background: radial-gradient(circle at top right, rgba(10, 213, 126, 0.6) 0%, #0ad57e 80%);
  //  }
  //  .create {
  //    width: 45%;
  //    height: 90%;
  //    background: radial-gradient(circle at top right, rgba(60, 126, 254, 0.6) 0%, #3c7efe 80%);
  //    border-radius: 10px;
  //    color: #fff;
  //  }
  //}
  .user-list-container {
    padding: 12px;
    min-height: calc(74vh - 202px);
    position: relative;
    .user-list {
      .user-list-item {
        margin-bottom: 12px;
        border-radius: 8px;
      }
    }
    .empty {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
