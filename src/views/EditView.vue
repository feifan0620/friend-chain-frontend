<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { type Ref, ref } from 'vue'
import { Dialog, Toast } from 'tdesign-mobile-vue'
const router = useRouter()
const route = useRoute()
// 保存按钮可以状态
const saveDisabled = ref(true)

const currentValue: Ref<String> = ref(route.query.currentValue as string)
const editKey: string = route.query.editKey as string
const editName: string = route.query.editName as string
const onSave = () => {
  if (currentValue.value === '') {
    Toast(`${editName}不能为空`)
    return
  }
  switch (editKey) {
    case 'username':
      console.log({ username: currentValue.value })
      break
    case 'phone':
      if (!currentValue.value.match(/^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/)) {
        Toast('请输入正确的手机号')
        return
      }
      console.log({ phone: currentValue.value })
      break
    case 'email':
      if (!currentValue.value.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)) {
        Toast('请输入正确的邮箱')
        return
      }
      console.log({ email: currentValue.value })
      break
  }
}
</script>

<template>
  <!-- 导航栏 -->
  <t-navbar :fixed="false" @left-click="router.back()" left-arrow :title="'修改' + editName">
    <!-- 保存按钮 -->
    <template #right>
      <t-button class="save" size="small" @click="onSave" :disabled="saveDisabled" theme="primary"
        >保存</t-button
      >
    </template>
  </t-navbar>

  <!-- 输入框 -->
  <div class="input-view">
    <div class="input">
      <t-input
        @change="saveDisabled = false"
        :placeholder="'请设置您的' + editName"
        :maxcharacter="24"
        :type="editKey === 'phone' ? 'number' : 'text'"
        clearable
        v-model:value.trim="currentValue"
      />
    </div>

    <div v-if="editKey === 'username'" class="user-name-tip">
      <span>昵称最多24个字符(1个汉字表示2个字符长度)。</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.save {
  margin-right: 6px;
}
.input-view {
  height: 30vh;
  .input {
    width: 90vw;
    margin: 12px auto;
    --td-input-bg-color: #efefef;
    --td-input-border-radius: 5px;
    --td-input-vertical-padding: 10px;
  }
  .user-name-tip {
    width: 90vw;
    margin: 0 auto;
    color: #999;
    font-size: 14px;
  }
}
</style>
