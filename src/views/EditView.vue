<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { type Ref, ref } from 'vue'
import { Toast } from 'tdesign-mobile-vue'

const router = useRouter()
const route = useRoute()
// 保存按钮可以状态
const saveDisabled = ref(true)

const currentValue: Ref<String> = ref(route.query.currentValue as string)
const editKey: string = route.query.editKey as string
const editName: string = route.query.editName as string
const onSave = () => {
  if (editKey === 'username' && currentValue.value === '') {
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
    case 'profile':
      console.log({ profile: currentValue.value })
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
  <t-textarea
    v-if="editKey === 'profile'"
    maxlength="36"
    @focus="saveDisabled = false"
    indicator
    class="textarea-example"
    placeholder="请输入您的个人简介"
    v-model:value.trim="currentValue"
  ></t-textarea>

  <div v-else class="input-view">
    <div class="input">
      <t-input
        @change="saveDisabled = false"
        :placeholder="'请输入您的' + editName"
        :maxcharacter="24"
        :type="editKey === 'phone' ? 'number' : 'text'"
        :label="editKey === 'phone' ? '+86' : ''"
        clearable
        clearTrigger="focus"
        borderless
        v-model:value.trim="currentValue"
      />
    </div>
    <div class="user-name-tip" v-if="editKey === 'username'">
      <span>昵称最多24个字符(1个汉字表示2个字符长度)。</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.save {
  margin-right: 6px;
}
.input-view {
  height: 50vh;
  .input {
    width: 90vw;
    margin: 18px auto;
    //--td-input-bg-color: #efefef;
    --td-input-vertical-padding: 8px;
    border-bottom: 1px solid #0052d9;
    --td-font-size-m: 20px;
  }
  .user-name-tip {
    width: 90vw;
    margin: 0 auto;
    color: #999;
  }
}
.textarea-example {
  height: 30vh;
}
</style>
