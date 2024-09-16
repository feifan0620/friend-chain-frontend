<script setup lang="ts">
import { ChevronRightIcon } from 'tdesign-icons-vue-next'

const user = {
  id: '1',
  username: '非凡',
  userAccount: 'feifan',
  avatarUrl: 'https://tdesign.gtimg.com/mobile/demos/avatar4.png',
  gender: 0,
  userPassword: '12345678',
  tags: ['java', '前端', '大数据'],
  phone: '13123452345',
  email: '123456@qq.com',
  userCode: '456781239',
  // 时间转换为字符串，不带时分秒
  createTime: new Date().toLocaleDateString()
}
</script>

<template>
  <t-cell-group bordered>
    <t-cell class="my-avatar" title="头像" arrow hover>
      <template #note>
        <t-avatar shape="circle" size="large" :image="user.avatarUrl">FF</t-avatar>
      </template>
    </t-cell>
    <t-cell title="用户名" :note="user.username" arrow hover />
    <t-cell title="性别" :note="user.gender === 0 ? '男' : '女'" arrow hover />
    <t-cell title="手机号" :note="user.phone" arrow hover />
    <t-cell title="邮箱" :note="user.email" arrow hover />
    <t-cell title="标签" :note="user.tags.join('、')" arrow hover />
    <t-cell title="加入时间" :note="user.createTime" />
    <t-cell title="UID" :note="user.userCode" />
  </t-cell-group>
</template>

<style lang="less" scoped></style>
