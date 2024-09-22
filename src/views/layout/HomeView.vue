<script setup lang="ts">
import UserItem from '@/components/UserItem.vue'
import { onMounted, ref } from 'vue'
import { recommendUsers } from '@/api/user'
import type { User } from '@/models/user'

const MAX_DATA_LEN = 60
const ONCE_LOAD_NUM = 10

let pageNum = 1

const loadData = async (data: any) => {
  const res = (await recommendUsers(ONCE_LOAD_NUM, pageNum)) as any

  const userList = res.data.records

  userList.map((item: User) => {
    return (item.tags = JSON.parse(item.tags as any))
  })

  data.value.push(...userList)
  pageNum++
}

const userList = ref([] as Array<User>)
const loading = ref('')

const onLoadPull = () => {
  if (userList.value.length >= MAX_DATA_LEN || loading.value) {
    return
  }
  loading.value = 'loading'
  loadData(userList).then(() => {
    loading.value = ''
  })
}

const onScroll = (scrollBottom: number) => {
  if (scrollBottom < 10) {
    onLoadPull()
  }
}

onMounted(() => {
  userList.value = []
  onLoadPull()
})
const content = ref([
  '友链内测版全新上线，欢迎各位同学体验！',
  '队伍功能已上线，快来组建自己的项目团队吧!'
])
const swiperList = [
  'src/assets/acm.png',
  'src/assets/MAKERS游戏开发大赛.jpg',
  'src/assets/华为开发者大赛.jpg',
  'src/assets/智能交互创新赛.jpg',
  'src/assets/蓝桥杯.jpg'
]

const handleSwiperClick = (value: number) => {
  console.log('click: ', value)
}
</script>

<template>
  <div class="home">
    <div class="banner">
      <t-swiper :navigation="{ type: 'dots' }" interval="3000" autoplay @click="handleSwiperClick">
        <t-swiper-item v-for="(item, index) in swiperList" :key="index" style="height: 26vh">
          <img :src="item" class="img" />
        </t-swiper-item>
      </t-swiper>
    </div>
    <t-notice-bar visible marquee :content="content" direction="vertical">
      <template #prefixIcon>
        <t-icon name="sound"></t-icon>
      </template>
    </t-notice-bar>
    <div class="user-list-container">
      <t-tabs class="tabs" default-value="first" :spaceEvenly="false">
        <t-tab-panel value="first">
          <template #label>
            <div>推荐</div>
          </template>
        </t-tab-panel>
        <t-tab-panel value="second">
          <template #label>附近</template>
        </t-tab-panel>
      </t-tabs>

      <t-list class="user-list" :async-loading="loading" @scroll="onScroll">
        <UserItem class="user-list-item" v-for="item in userList" :key="item.id" :user="item" />
        <t-back-top />
      </t-list>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  padding-bottom: 72px;
  padding-top: 48px;
  background-color: #efefef;
  .search {
    z-index: 100;
  }
  .banner {
    --td-swiper-border-radius: 0px;
    .img {
      width: 100%;
      height: 100%;
    }
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
  .user-list {
    width: 95%;
    margin: 12px auto;
    .user-list-item {
      margin-top: 12px;
      border-radius: 8px;
    }
  }
}
</style>
