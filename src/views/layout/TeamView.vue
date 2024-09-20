<script lang="ts" setup>
import { h } from 'vue'
import { AddIcon } from 'tdesign-icons-vue-next'

import { ref } from 'vue'

const isShowDialog = ref(false)

const confirmBtn = {
  content: '确认',
  variant: 'text',
  size: 'large'
}
const cancelBtn = {
  content: '取消',
  variant: 'text',
  size: 'large'
}

const onConfirm = () => {
  console.log('dialog:confirm')
}
const onCancel = () => {
  console.log('dialog:cancel')
}

const iconFunc = () => h(AddIcon, { size: '24px' })
const onClick = () => {
  isShowDialog.value = true
}
</script>

<template>
  <div class="team">
    <t-empty
      class="empty"
      image="https://tdesign.gtimg.com/mobile/demos/empty1.png"
      description="暂无可加入队伍"
    />
    <t-fab :icon="iconFunc" :draggable="false" style="right: 20px; bottom: 72px" @click="onClick" />
    <t-dialog
      v-model:visible="isShowDialog"
      close-on-overlay-click
      title="新建队伍"
      :cancel-btn="cancelBtn"
      :confirm-btn="confirmBtn"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <t-input placeholder="请输入队伍名称" />
    </t-dialog>
  </div>
</template>

<style scoped>
.team {
  height: calc(100vh - 88px);
  background-color: #f3f3f3;
  margin-bottom: 40px;
  margin-top: 48px;
  display: flex;
  position: relative;
  .empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
