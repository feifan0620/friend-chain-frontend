<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
defineOptions({
  name: 'LayoutIndex'
})

const value = ref('label_1')
const list = ref([
  { value: '/home', label: '首页', icon: 'home' },
  { value: '/team', label: '队伍', icon: 'usergroup' },
  { value: '/user', label: '我的', icon: 'user' }
])
const changeView = (changeValue: string) => {
  router.push(changeValue)
}
</script>

<template>
  <t-navbar title="标题文字" :fixed="false" left-arrow class="custom-navbar">
    <template #right>
      <t-icon name="search" size="24px" />
    </template>
  </t-navbar>

  <router-view />

  <t-tab-bar v-model="value" theme="tag" @change="changeView(value)" :split="false">
    <t-tab-bar-item v-for="item in list" :key="item.value" :value="item.value">
      {{ item.label }}
      <template #icon>
        <t-icon :name="item.icon" />
      </template>
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<style lang="less" scoped>
.custom-navbar {
  --td-navbar-bg-color: #0052d9;
  --td-navbar-color: #fff;
}
</style>
