<script setup lang="ts">
import { ref } from 'vue'
defineOptions({
  name: 'LayoutIndex'
})

const active = ref('home')
</script>

<template>
  <van-nav-bar title="标题" left-arrow>
    <template #right>
      <van-icon name="search" size="20" />
    </template>
  </van-nav-bar>

  <router-view />

  <van-tabbar v-model="active">
    <van-tabbar-item name="home" to="/home" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item name="team" to="/team" icon="friends-o">队伍</van-tabbar-item>
    <van-tabbar-item name="user" to="/user" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style lang="less" scoped></style>
