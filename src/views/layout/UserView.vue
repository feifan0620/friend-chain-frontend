<script setup lang="ts">
import router from '@/router'
import { computed, h, ref, type Ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { updateUser, userLogout } from '@/api/user'
import { Toast } from 'tdesign-mobile-vue'
import { TAGS_LISTS } from '@/constans'

const userStore = useUserStore()

// 当前用户信息
const user = ref()

user.value = userStore.userInfo

/**
 * 跳转到编辑页面的函数
 *
 * @param editKey - 编辑项的唯一键值
 * @param editName - 编辑项的名称
 * @param currentValue - 编辑项的当前值
 */
const goEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue
    }
  })
}

// 性别选择器状态
const genderState = ref({
  show: false, // 显示选择器状态
  gender: [user.value?.gender] // 当前选中的性别值
})

// 性别选择器选项
const genderOptions = () => {
  return [
    {
      label: '男',
      value: 0
    },
    {
      label: '女',
      value: 1
    },
    {
      label: '保密',
      value: 2
    }
  ]
}

// 将性别值转换为对应文本
const genderValue = () => {
  switch (genderState.value.gender[0]) {
    case 0:
      return '男'
    case 1:
      return '女'
    default:
      return '保密'
  }
}

/**
 * 确认性别选择的异步函数
 * 当用户确认性别后，如果所选性别与用户当前性别不同，则更新用户信息中的性别
 */
const onGenderConfirm = async () => {
  // 检查所选性别是否与用户当前性别不同
  if (genderState.value.gender[0] !== user.value.gender) {
    // 更新用户信息中的性别
    await updateUser({
      id: userStore.userId as number,
      gender: genderState.value.gender[0]
    })

    // 更新应用内用户信息状态
    userStore.setUserInfo({
      id: userStore.userId as number,
      gender: genderState.value.gender[0]
    })

    // 显示修改成功的提示
    Toast.success('修改成功')
  }

  // 关闭性别选择界面
  genderState.value.show = false
}

// 标签选择器状态
const tagPickerVisible = ref(false)
// 原始标签列表
const originalTagList = TAGS_LISTS
// 当前显示（搜索后）的标签列表
const tagList = ref(originalTagList)
// 选中标签列表，用于渲染用户标签
const selectedTagList: Ref<Array<any>> = ref(['年级', user.value.tags || []])
// 计算已选标签数组
const selectedTags = computed(() => {
  return selectedTagList.value[1]
})

/**
 * 确认标签选择操作
 */
const onTagsConfirm = async () => {
  // 检查当前选中的标签列表与用户已有的标签列表是否相同
  // 如果不相同，才进行更新用户的标签列表的操作
  const selectedTags = JSON.stringify(selectedTagList.value[1])
  if (selectedTags !== user.value.tags) {
    await updateUser({
      id: userStore.userId as number,
      tags: selectedTags as any
    })
    useUserStore().setUserInfo({
      id: userStore.userId as number,
      tags: JSON.parse(selectedTags as any)
    })
    user.value = userStore.userInfo
    Toast.success('修改成功')
  }
  // 关闭标签选择器的可见状态，表示用户已完成选择操作
  tagPickerVisible.value = false
}

// 头像选择弹窗状态
const avatarSheetVisible = ref(false)
// 头像选择弹窗选项
const avatarSheetItems = ['选择图片', '拍照']

/**
 * 处理操作面板选择事件的函数
 */
const onActionSheetSelect = (selectedItem: string) => {
  console.log(selectedItem)
}

const logout = async () => {
  await userLogout()
  userStore.clearUserInfo()
  await router.push('/')
  Toast.success('退出成功')
}
</script>

<template>
  <div class="user-info" v-if="user">
    <!-- 用户信息 -->
    <t-cell-group bordered>
      <t-cell class="my-avatar" @click="avatarSheetVisible = true" title="头像" arrow hover>
        <template #note>
          <t-avatar shape="circle" :image="user.avatarUrl" size="large">
            {{ user.username?.substring(0, 1) || '用户' }}
          </t-avatar>
        </template>
      </t-cell>
      <t-cell
        title="昵称"
        @click="goEdit('username', '昵称', user.username)"
        :note="user.username || '用户' + user.userCode"
        arrow
        hover
      />
      <t-cell title="性别" @click="genderState.show = true" :note="genderValue" arrow hover />
      <t-cell
        title="手机号"
        @click="goEdit('phone', '手机号', user.phone as string)"
        :note="user.phone"
        arrow
        hover
      />
      <t-cell
        title="邮箱"
        @click="goEdit('email', '邮箱', user.email as string)"
        :note="user.email"
        arrow
        hover
      />
      <t-cell
        title="标签"
        @click="tagPickerVisible = true"
        :note="user.tags?.join('、')"
        arrow
        hover
      />
      <t-cell
        title="个人简介"
        @click="goEdit('profile', '个人简介', user.profile as string)"
        :note="(user.profile as string)?.substring(0, 10).concat('...')"
        arrow
        hover
      />
      <t-cell title="加入时间" :note="user.createTime?.substring(0, 10)" />
      <t-cell title="UID" :note="user.userCode" />
    </t-cell-group>

    <!-- 性别选择器 -->
    <t-popup class="gender-popup" v-model="genderState.show" placement="bottom">
      <t-picker
        v-model="genderState.gender"
        title="选择性别"
        @cancel="genderState.show = false"
        @confirm="onGenderConfirm"
        :columns="genderOptions"
      />
    </t-popup>

    <!-- 标签选择器 -->
    <t-popup
      class="tag-select-popup"
      v-model="tagPickerVisible"
      placement="bottom"
      style="height: 58vh"
    >
      <div class="header">
        <div class="btn btn--cancel" aria-role="button" @click="tagPickerVisible = false">取消</div>
        <div class="title">选择标签</div>
        <div class="btn btn--confirm" aria-role="button" @click="onTagsConfirm">确定</div>
      </div>
      <t-tree-select
        v-model="selectedTagList"
        :options="tagList"
        multiple
        filterable
      ></t-tree-select>
    </t-popup>

    <!-- 头像选择弹窗 -->
    <t-action-sheet
      v-model="avatarSheetVisible"
      :items="avatarSheetItems"
      @selected="onActionSheetSelect"
      @cancel="avatarSheetVisible = false"
    />
    <t-button class="logout-btn" @click="logout" block size="large" theme="danger"
      >退出登录</t-button
    >
  </div>
</template>

<style lang="less" scoped>
.empty {
  height: 100vh;
  padding-bottom: 40px;
  padding-top: 20vh;
  background-color: #efefef;
}

.user-info {
  height: 100vh;
  padding-bottom: 56px;
  padding-top: 48px;
  overflow: auto;
  .my-avatar {
    --td-avatar-text-large-font-size: 24px;
    //--td-avatar-bg-color: #0052d9;
    //--td-avatar-content-color: #fff;
  }
  .logout-btn {
    width: 90vw;
    margin: 32px auto;
  }
}

// 标签选择弹窗样式
.tag-select-popup {
  height: calc(50vh - 56px);
  .header {
    display: flex;
    align-items: center;
    height: 116rpx;
  }
  .title {
    flex: 1;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
  }

  .btn {
    font-size: 16px;
    padding: 16px;
  }

  .btn--cancel {
    color: var(--td-text-color-secondary, rgba(0, 0, 0, 0.6));
  }

  .btn--confirm {
    color: #0052d9;
  }
}
</style>
