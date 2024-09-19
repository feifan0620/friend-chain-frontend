<script setup lang="ts">
import router from '@/router/index.js'
import { ref } from 'vue'
const isAgree = ref(false)
</script>

<template>
  <t-navbar title="用户登录" :fixed="false" left-arrow @left-click="router.back()" />
  <div class="login-container">
    <h1 class="welcome-title">欢迎来到友链</h1>
    <div class="sub-title">寻找志同道合的伙伴</div>
    <t-input class="user-name-input" borderless placeholder="请输入手机号/用户名" />
    <t-input class="password-input" borderless placeholder="请输入登录密码" type="password" />
    <t-button class="login-btn" :disabled="!isAgree" theme="primary" block>登录</t-button>
    <div class="login-footer">
      <div class="register">注册</div>
      <div class="forget-password">忘记密码</div>
    </div>
  </div>
  <div class="agreement">
    <t-radio allowUncheck label="已阅读并同意" :block="false" v-model:checked="isAgree" />
    <t-link hover size="large" theme="primary" href="#">《友链用户协议》</t-link>
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
    --td-input-bg-color: #efefef;
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
    margin-top: 6vh;
    --td-button-medium-height: 45px;
  }
  .login-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    font-size: 16px;
    color: #0052d9;
  }
}
.agreement {
  text-align: center;
  position: fixed;
  bottom: 6vh;
  width: 100%;
  --td-radio-font-size: 16px;
  --td-radio-label-line-height: 14px;
  --td-radio-icon-size: 18px;
  .t-link {
    display: inline-block;
  }
}
</style>
