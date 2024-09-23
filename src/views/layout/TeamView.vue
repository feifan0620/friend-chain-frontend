<script lang="ts" setup>
import { h } from 'vue'
import { AddIcon } from 'tdesign-icons-vue-next'
import { IconFont } from 'tdesign-icons-vue-next'
import { ref } from 'vue'
import teamItem from '@/components/TeamItem.vue'
import router from '@/router'
const isShowDialog = ref(false)

const iconFunc = () => h(AddIcon, { size: '24px' })
</script>

<template>
  <div class="team">
    <div class="team-tab-bar">
      <t-tabs default-value="first">
        <t-tab-panel value="first">
          <template #label>
            <div class="label-content">
              <icon-font name="usergroup-add" size="large" />
              <span>公开</span>
            </div>
          </template>
        </t-tab-panel>
        <t-tab-panel value="second">
          <template #label>
            <div class="label-content">
              <icon-font name="lock-on" size="large" />
              <span>加密</span>
            </div>
          </template>
        </t-tab-panel>
      </t-tabs>
    </div>
    <team-item v-for="item in 10"></team-item>
    <!--<t-empty-->
    <!--  class="empty"-->
    <!--  image="https://tdesign.gtimg.com/mobile/demos/empty1.png"-->
    <!--  description="暂无可加入队伍"-->
    <!--/>-->
    <t-fab
      :icon="iconFunc"
      :draggable="false"
      style="right: 24px; bottom: 80px"
      @click="router.push('/team/add')"
    />
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
  position: relative;
  .t-tabs {
    margin-bottom: 16px;
  }
  .team-tab-bar {
    width: 100%;
  }

  .label-content {
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      margin-left: 3px;
    }
  }
  .empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
