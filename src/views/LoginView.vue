<script setup lang="ts">
import router from '@/router/index.js'
</script>

<template>
  <t-navbar title="用户登录" :fixed="false" left-arrow @left-click="router.back()" />

  <div class="login-container">
    <t-input class="user-name-input" placeholder="请输入手机号/用户名" />
    <t-input class="password-input" placeholder="请输入登录密码" type="password" />
    <t-button class="login-btn" theme="primary" block>登录</t-button>
    <div class="login-footer">
      <div class="register">注册</div>
      <div class="forget-password">忘记密码</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-container {
  height: 50vh;
  padding: 20px;
  .user-name-input {
    margin-top: 8vh;
    border-bottom: 1px solid #efefef;
    --td-input-vertical-padding: 10px;
  }
  .password-input {
    margin-top: 12px;
    border-bottom: 1px solid #efefef;
    --td-input-vertical-padding: 10px;
  }

  .login-btn {
    margin-top: 5vh;
    --td-button-medium-height: 45px;
  }
  .login-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    font-size: 14px;
  }
}
</style>
