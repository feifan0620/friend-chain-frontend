<script setup lang="ts">
import UserItem from '@/components/UserItem.vue'
import { onMounted, ref } from 'vue'

const MAX_DATA_LEN = 30

const loadData = (data: any, isRefresh?: Boolean) => {
  const ONCE_LOAD_NUM = 10

  return new Promise((resolve) => {
    setTimeout(() => {
      const temp = []
      for (let i = 0; i < ONCE_LOAD_NUM; i++) {
        if (isRefresh) {
          temp.push(`${i + 1}`)
        } else {
          temp.push(`${data.value.length + 1 + i}`)
        }
      }

      if (isRefresh) {
        data.value = temp
      } else {
        data.value.push(...temp)
      }

      resolve(data)
    }, 1000)
  })
}

const listPull = ref([] as Array<any>)
const loading = ref('')
const refreshing = ref(false)

const onLoadPull = (isRefresh?: Boolean) => {
  if ((listPull.value.length >= MAX_DATA_LEN && !isRefresh) || loading.value) {
    return
  }
  loading.value = 'loading'
  loadData(listPull, isRefresh).then(() => {
    loading.value = ''
    refreshing.value = false
  })
}

const onScroll = (scrollBottom: number) => {
  if (scrollBottom < 50) {
    onLoadPull()
  }
}

const onRefresh = () => {
  refreshing.value = true
  onLoadPull(true)
}

onMounted(() => {
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

const onClick = () => {
  props.container().scrollTo(0, 1200)
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

      <t-pull-down-refresh v-model="refreshing" @refresh="onRefresh">
        <t-list class="user-list" :async-loading="loading" @scroll="onScroll">
          <UserItem class="user-list-item" v-for="item in listPull" :key="item" :id="item" />
        </t-list>
      </t-pull-down-refresh>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  margin-bottom: 56px;
  margin-top: 48px;
  background-color: #efefef;
  .search {
    z-index: 100;
  }
  .banner {
    --td-swiper-border-radius: 8px;
    padding: 12px;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .tabs {
    background-color: red;
  }
  .user-list {
    width: 95%;
    margin: 12px auto;
    background-color: #efefef;
    .user-list-item {
      margin-top: 12px;
      border-radius: 8px;
    }
  }
}
</style>
