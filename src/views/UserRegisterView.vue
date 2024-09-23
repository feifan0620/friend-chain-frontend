<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { userRegister } from '@/api/user'
import { Dialog, Toast } from 'tdesign-mobile-vue'

const router = useRouter()
const isAgree = ref(true)

const userAccount = ref('')
const userPassword = ref('')
const checkPassword = ref('')
const userCode = ref('')

const registerAvailable = computed(() => {
  return userAccount.value && userPassword.value && checkPassword.value && userCode.value
})

/**
 * 用户注册
 */
const register = async () => {
  if (!isAgree.value) {
    Dialog.confirm({
      title: '提示',
      content: '请先阅读并同意用户协议',
      confirmBtn: '确定'
    })
    return
  }
  if (userAccount.value.length < 4) {
    Dialog.confirm({
      title: '提示',
      content: '账号长度不能小于4位',
      confirmBtn: '确定'
    })
    return
  }
  if (userPassword.value.length < 8 || checkPassword.value.length < 8) {
    Dialog.confirm({
      title: '提示',
      content: '密码长度不能小于8位',
      confirmBtn: '确定'
    })
    return
  }
  if (userPassword.value !== checkPassword.value) {
    Dialog.confirm({
      title: '提示',
      content: '两次输入的密码不一致',
      confirmBtn: '确定'
    })
    return
  }
  if (userCode.value.length > 5) {
    Dialog.confirm({
      title: '提示',
      content: '用户编号不能大于5',
      confirmBtn: '确定'
    })
    return
  }

  await userRegister(userAccount.value, userPassword.value, checkPassword.value, userCode.value)
  // 注册成功后返回登录页
  await router.replace('/login')
  Toast.success('注册成功')
}
</script>

<template>
  <div class="register">
    <t-navbar title="用户注册" :fixed="false" left-arrow @left-click="router.back()" />
    <div class="register-container">
      <h1 class="welcome-title">欢迎来到友链</h1>
      <div class="sub-title">携手共进，成就彼此</div>
      <t-input
        class="user-name-input"
        v-model="userAccount"
        borderless
        placeholder="请输入用户账号"
      />
      <t-input
        class="password-input"
        v-model="userPassword"
        borderless
        placeholder="请输入登录密码"
        type="password"
      />
      <t-input
        class="password-input"
        v-model="checkPassword"
        borderless
        placeholder="请再次确认密码"
        type="password"
      />
      <t-input
        class="user-name-input"
        type="number"
        v-model="userCode"
        borderless
        placeholder="请输入用户编号"
      />
      <t-button
        class="register-btn"
        @click="register"
        :disabled="!registerAvailable"
        theme="primary"
        block
        >注册</t-button
      >
    </div>
    <div class="agreement">
      <t-radio allowUncheck label="已阅读并同意" :block="false" v-model:checked="isAgree" />
      <t-link hover size="large" theme="primary" href="#">《友链用户协议》</t-link>
    </div>
  </div>
</template>

<style scoped lang="less">
.register-container {
  height: 50vh;
  padding: 24px;
  .welcome-title {
    margin-top: 4vh;
    font-size: 28px;
    font-weight: bold;
  }
  .sub-title {
    margin: 8px 0;
    font-size: 16px;
    color: #999999;
  }
  .t-input {
    --td-input-bg-color: #f3f3f3;
    --td-input-border-radius: 10px;
    --td-input-vertical-padding: 10px;
    border-radius: 10px;
    margin-top: 3vh;
  }
  .register-btn {
    margin-top: 4vh;
    --td-button-medium-height: 45px;
  }
}
.agreement {
  text-align: center;
  position: fixed;
  bottom: 6vh;
  width: 100%;
  --td-radio-font-size: 17px;
  --td-radio-label-line-height: 17px;
  --td-radio-icon-size: 18px;
  .t-link {
    display: inline-block;
    vertical-align: text-top;
  }
}
</style>
