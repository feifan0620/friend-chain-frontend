<script setup lang="ts">
import UserItem from '@/components/UserItem.vue'
import { ref } from 'vue'
const content = ref([
  '友链内测版全新上线，欢迎各位同学体验！',
  '友链内测版全新上线，欢迎各位同学体验！'
])
</script>

<template>
  <div class="home">
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
  .search {
    z-index: 100;
  }

  .user-list-container {
    height: 100%;
    background-color: #efefef;
    .user-list {
      padding: 12px;
      .user-list-item {
        margin-bottom: 12px;
      }
    }
  }
}
</style>
