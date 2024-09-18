<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const route = useRoute()
import UserItem from '@/components/UserItem.vue'
const product = {
  value: 'all',
  options: [
    {
      value: 'all',
      label: '全部性别'
    },
    {
      value: '0',
      label: '男'
    },
    {
      value: '1',
      label: '女'
    }
  ]
}
const sorter = {
  value: 'all',
  options: [
    {
      value: 'all',
      label: '全部年级'
    },
    {
      value: '大一',
      label: '大一'
    },
    {
      value: '大二',
      label: '大二'
    },
    {
      value: '大三',
      label: '大三'
    },
    {
      value: '大四',
      label: '大四'
    }
  ]
}

const tags = ref(route.query.tags as string[])
</script>

<template>
  <t-navbar class="search" title="伙伴匹配" left-arrow @left-click="router.back()" />

  <div class="user-list-container">
    <t-dropdown-menu class="filter-menu">
      <t-dropdown-item :options="product.options" :value="product.value" />
      <t-dropdown-item :options="sorter.options" :value="sorter.value" />
    </t-dropdown-menu>
    <UserItem
      v-for="user in 10"
      :key="user"
      :username="Math.floor(Math.random() * 10) + 1"
      :avatar="Math.floor(Math.random() * 5) + 1"
      :desc="Math.floor(Math.random() * 10) + 1"
      :tags="Math.floor(Math.random() * 10) + 1"
    />
  </div>
</template>

<style scoped lang="less">
.search {
  z-index: 100;
}

.user-list-container {
  padding-top: var(--td-navbar-height, 48px);
  height: 100%;
  background-color: #efefef;
}
</style>
