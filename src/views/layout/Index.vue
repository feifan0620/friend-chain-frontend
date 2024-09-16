<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
defineOptions({
  name: 'LayoutIndex'
})

// tabbar 配置
const value = ref('/home')
const list = ref([
  { value: '/home', label: '首页', icon: 'home' },
  { value: '/team', label: '队伍', icon: 'flag-3' },
  { value: '/user', label: '我的', icon: 'user' }
])

interface TitleMap {
  [key: string]: string
}

const navTitle = ref('友链')

// const visible = ref(false)
const onClick = () => {
  router.push('/user')
}

// 监听url地址栏变化
watch(
  () => route.path,
  (newPath) => {
    router.push(newPath)
    value.value = newPath
    // 使用对象映射来设置 navTitle
    const titleMap: TitleMap = {
      '/home': '友链',
      '/team': '队伍',
      '/user': '用户信息'
    }

    // 根据路径设置 navTitle
    if (titleMap[newPath]) {
      navTitle.value = titleMap[newPath]
    } else {
      navTitle.value = '' // 或者设置一个默认值
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const onchange = (val: string) => {
  try {
    // 跳转路由，并捕获错误
    router.push(val)
  } catch (error) {
    console.error('Failed to push route:', error)
  }
}
</script>

<template>
  <t-navbar
    :title="navTitle"
    :fixed="false"
    animation
    @right-click="router.push('/search')"
    class="custom-navbar"
  >
    <template #left>
      <t-icon name="user" size="24px" @click="onClick" />
    </template>
    <template #right>
      <t-icon name="search" size="24px" />
    </template>
  </t-navbar>

  <router-view />

  <t-tab-bar v-model="value" theme="tag" @change="onchange(value)" :split="false">
    <t-tab-bar-item v-for="item in list" :key="item.value" :value="item.value">
      {{ item.label }}
      <template #icon>
        <t-icon :name="item.icon" />
      </template>
    </t-tab-bar-item>
  </t-tab-bar>

  <!--  <t-popup v-model="visible" placement="left" style="padding: 100px" />-->
</template>

<style lang="less" scoped>
.custom-navbar {
  --td-navbar-bg-color: #0052d9;
  --td-navbar-color: #fff;
}
</style>
