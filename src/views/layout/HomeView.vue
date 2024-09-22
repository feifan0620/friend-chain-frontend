<script setup lang="ts">
import UserItem from '@/components/UserItem.vue'
import { ref } from 'vue'
const content = ref([
  '友链内测版全新上线，欢迎各位同学体验！',
  '队伍功能已上线，快来组建自己的项目团队吧!'
])
const imageCdn = 'https://tdesign.gtimg.com/mobile/demos'
const swiperList = [
  'src/assets/acm.png',
  'src/assets/MAKERS游戏开发大赛.jpg',
  'src/assets/华为开发者大赛.jpg',
  'src/assets/智能交互创新赛.jpg',
  'src/assets/蓝桥杯.jpg'
]

const handleChange = (index: number, context: any) => {
  console.log('基础示例,页数变化到》》》', index, context)
}

const handleClick = (value: number) => {
  console.log('click: ', value)
}
</script>

<template>
  <div class="home">
    <div class="banner">
      <t-swiper
        :navigation="{ type: 'dots' }"
        interval="3000"
        loop
        autoplay
        @click="handleClick"
        @change="handleChange"
      >
        <t-swiper-item v-for="(item, index) in swiperList" :key="index" style="height: 192px">
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
      <t-tabs default-value="first" :spaceEvenly="false">
        <t-tab-panel value="first">
          <template #label>
            <div>推荐</div>
          </template>
        </t-tab-panel>
        <t-tab-panel value="second">
          <template #label>附近</template>
        </t-tab-panel>
      </t-tabs>
      <t-list class="user-list">
        <UserItem class="user-list-item" v-for="item in 10" :key="item" />
      </t-list>
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
    --td-swiper-border-radius: 0;
    .img {
      width: 100%;
      height: 100%;
    }
  }

  .user-list-container {
    height: 100%;
    .user-list {
      padding: 12px;
      .user-list-item {
        margin-bottom: 12px;
      }
    }
  }
}
</style>
