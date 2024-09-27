<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { userLogin } from '@/api/user'
import { Dialog, Toast } from 'tdesign-mobile-vue'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const isAgree = ref(true)

const userAccount = ref('')
const userPassword = ref('')

const loginAvailable = computed(() => {
  return userAccount.value.length >= 4 && userPassword.value.length >= 8
})

const login = async () => {
  if (!isAgree.value) {
    Dialog.confirm({
      title: '提示',
      content: '请先阅读并同意用户协议',
      confirmBtn: '确定'
    })
    return
  }
  // 登录逻辑
  const { data: user } = await userLogin(userAccount.value, userPassword.value)
  if (user.tags) {
    user.tags = JSON.parse(user.tags)
  }
  userStore.setUserInfo(user)
  // 登录成功后返回首页/上一页并给用户提示
  const url = route.query.redirectUrl || '/'
  await router.replace(url as string)
  Toast.success('登录成功')
}
</script>

<template>
  <div class="login">
    <t-navbar
      title="用户登录"
      :fixed="false"
      left-arrow
      @left-click="router.go(-1)"
    />
    <div class="login-container">
      <h1 class="welcome-title">欢迎来到友链</h1>
      <div class="sub-title">携手共进，成就彼此</div>
      <t-input
        class="user-name-input"
        v-model="userAccount"
        borderless
        placeholder="请输入用户名/手机号"
      />
      <t-input
        class="password-input"
        v-model="userPassword"
        borderless
        placeholder="请输入登录密码"
        type="password"
      />
      <t-button
        class="login-btn"
        @click="login"
        :disabled="!loginAvailable"
        theme="primary"
        block
        >登录</t-button
      >
      <div class="login-footer">
        <div class="register" @click="router.push('/register')">注册</div>
        <div class="forget-password">忘记密码</div>
      </div>
    </div>
    <div class="agreement">
      <t-radio
        allowUncheck
        label="已阅读并同意"
        :block="false"
        v-model:checked="isAgree"
      />
      <t-link hover size="large" theme="primary" href="#"
        >《友链用户协议》</t-link
      >
    </div>
  </div>
</template>

<style scoped lang="less">
.login-container {
  height: 50vh;
  padding: 24px;
  .welcome-title {
    margin-top: 4vh;
    font-size: 28px;
    font-weight: bold;
  }
  .sub-title {
    margin-top: 6px;
    font-size: 16px;
    color: #999999;
  }
  .t-input {
    --td-input-bg-color: #f3f3f3;
    --td-input-border-radius: 10px;
    --td-input-vertical-padding: 10px;
    border-radius: 10px;
  }
  .user-name-input {
    margin-top: 4vh;
  }
  .password-input {
    margin-top: 3vh;
  }
  .login-btn {
    margin-top: 4vh;
    --td-button-medium-height: 45px;
  }
  .login-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    font-size: 15px;
    color: #0052d9;
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
