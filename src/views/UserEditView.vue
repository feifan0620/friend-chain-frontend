<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { type Ref, ref } from 'vue'
import { Toast } from 'tdesign-mobile-vue'
import { useUserStore } from '@/stores/user'
import { updateUser } from '@/api/user'

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()

// 保存按钮可用状态
const saveDisabled = ref(true)

// 当前修改用户信息的值
const currentValue: Ref<String> = ref(route.query.currentValue as string)
// 当前修改用户信息的键
const editKey: string = route.query.editKey as string
// 当前修改用户信息的名称
const editName: string = route.query.editName as string
/**
 * 点击保存按钮的函数
 * 更新服务器用户信息及当前用户状态
 */
const onSave = async () => {
  if (currentValue.value === '') {
    Toast(`${editName}不能为空`)
    return
  }
  switch (editKey) {
    case 'phone':
      if (!currentValue.value.match(/^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/)) {
        Toast('请输入正确的手机号')
        return
      }
      break
    case 'email':
      if (!currentValue.value.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)) {
        Toast('请输入正确的邮箱')
        return
      }
      break
  }

  // 更新服务器用户信息，将 editKey 对应的值更改为用户输入的值
  await updateUser({
    id: userStore.userId as number,
    [editKey]: currentValue.value
  })

  // 更新用户信息状态，将 editKey 对应的值更改为用户输入的值
  userStore.setUserInfo({
    id: userStore.userId as number,
    [editKey]: currentValue.value
  })

  // 弹出修改成功的提示
  Toast.success('修改成功')

  // 返回上一页
  router.back()
}
</script>

<template>
  <!-- 导航栏 -->
  <t-navbar
    class="user-edit-navbar"
    :fixed="false"
    @left-click="router.back()"
    left-arrow
    :title="'修改' + editName"
  >
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
    @change="saveDisabled = false"
    indicator
    class="textarea-profile"
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
.user-edit-navbar {
  --td-navbar-bg-color: #f5f7fc;
}
.save {
  margin-right: 6px;
}
.input-view {
  height: 50vh;
  .input {
    width: 90vw;
    margin: 18px auto;
    //--td-input-bg-color: #efefef;
    --td-input-vertical-padding: 4px;
    border-bottom: 1px solid #0052d9;
    --td-font-size-m: 16px;
  }
  .user-name-tip {
    width: 90vw;
    margin: 0 auto;
    color: #999;
  }
}
.textarea-profile {
  height: 30vh;
}
</style>
