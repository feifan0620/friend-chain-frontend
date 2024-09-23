<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

// 导航栏标题
const navTitle = ref('友链')

// 标签栏当前值
const activeTab = ref(window.location.hash.slice(1) || 'home')
// 标签栏配置项
const list = ref([
  { value: 'home', label: '首页', icon: 'home' },
  { value: 'team', label: '队伍', icon: 'flag-3' },
  { value: 'user', label: '我的', icon: 'user' }
])

const changeTab = (activeTab: string) => {
  switch (activeTab) {
    case 'home':
      router.push('/home')
      navTitle.value = '首页'
      break
    case 'team':
      router.push('/team')
      navTitle.value = '队伍'
      break
    case 'user':
      router.push('/user')
      navTitle.value = '我的'
      break
  }
}

// 定义一个标题映射接口，用于存储路径和对应页面标题的键值对
interface TitleMap {
  [key: string]: string
}
// 监听路由路径的变化，以便实时更新页面标题和导航标题
watch(
  () => route.path,
  (newPath) => {
    // 更新tab的值为新的路径
    activeTab.value = newPath.substring(1)
    // 定义页面标题的路径映射
    const titleMap: TitleMap = {
      '/home': '友链',
      '/team': '队伍',
      '/user': '用户信息'
    }
    // 根据当前路径设置导航标题
    if (titleMap[newPath]) {
      navTitle.value = titleMap[newPath]
    } else {
      // 如果当前路径没有对应的标题，则清空导航标题
      navTitle.value = ''
    }
  },
  {
    immediate: true // 立即执行一次监听回调
  }
)
</script>

<template>
  <div class="layout">
    <!-- 顶部导航栏 -->
    <t-navbar
      :title="navTitle"
      animation
      @right-click="router.push('/user/search')"
      class="custom-navbar"
    >
      <!-- 导航栏右侧搜索图标 -->
      <template #left>
        <t-icon name="user" size="24px" @click="router.push('/user')" />
      </template>
      <!-- 导航栏左侧用户图标 -->
      <template #right>
        <t-icon name="search" size="24px" />
      </template>
    </t-navbar>

    <!-- 根据路由路径显示不同的页面（首页、队伍、我的）-->
    <Suspense>
      <router-view />
    </Suspense>

    <!-- 底部标签栏 -->
    <t-tab-bar theme="tag" :split="false" @change="changeTab" v-model:value="activeTab">
      <t-tab-bar-item v-for="item in list" :key="item.value" :value="item.value">
        {{ item.label }}
        <template #icon>
          <t-icon :name="item.icon" />
        </template>
      </t-tab-bar-item>
    </t-tab-bar>
  </div>
</template>

<style lang="less" scoped>
// 自定义导航栏样式
.custom-navbar {
  --td-navbar-bg-color: #0052d9;
  --td-navbar-color: #fff;
  z-index: 100;
}
</style>
