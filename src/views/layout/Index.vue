<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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

const navTitle = ref('友链')

// const visible = ref(false)
const onClick = () => {
  value.value = '/user'
  nextTick(() => {
    router.push('/user')
    navTitle.value = '用户信息'
  })
}

const onchange = (val: string) => {
  router.push(val)
  switch (val) {
    case '/home':
      navTitle.value = '友链'
      break
    case '/team':
      navTitle.value = '队伍'
      break
    case '/user':
      navTitle.value = '用户信息'
      break
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
