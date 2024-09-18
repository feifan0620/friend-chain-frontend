<script setup lang="ts">
import router from '@/router'
import { computed, type Ref, ref } from 'vue'
import type { TreeSelectValue } from 'tdesign-mobile-vue'

// 用户信息
const user = ref({
  id: '1',
  username: 'Feifan',
  userAccount: 'feifan',
  avatarUrl: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
  gender: 0,
  userPassword: '12345678',
  tags: ['大三', 'Java', '大数据'],
  phone: '13123452345',
  email: '123456@qq.com',
  profile: '性格多变的双子男一枚，目前还有头发，阿巴阿巴阿巴，谢谢大家',
  userCode: '10001',
  // 时间转换为字符串(不包含时分秒)
  createTime: new Date().toLocaleDateString()
})

/**
 * 跳转到编辑页面的函数
 *
 * @param editKey - 编辑项的唯一键值
 * @param editName - 编辑项的名称
 * @param currentValue - 编辑项的当前值
 */
const goEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/edit',
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
  gender: [user.value.gender] // 当前选中的性别值
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
const genderValueText = computed(() => {
  switch (genderState.value.gender[0]) {
    case 0:
      return '男'
    case 1:
      return '女'
    default:
      return '保密'
  }
})

/**
 * 性别选择器确定按钮点击事件
 */
const onGenderConfirm = () => {
  console.log({ gender: genderState.value.gender[0] })
  genderState.value.show = false
}

// 标签选择器状态
const tagPickerVisible = ref(false)

// 已选标签列表标签取消选中监听事件
function onClickClose(index: string) {
  ;(selectedTagList.value[1] as any).splice(index, 1)
}
// 原始标签列表
const originalTagList = [
  {
    label: '年级',
    value: '年级',
    children: [
      { label: '大一', value: '大一' },
      { label: '大二', value: '大二' },
      { label: '大三', value: '大三' },
      { label: '大四', value: '大四' },
      { label: '研一', value: '研一' },
      { label: '研二', value: '研二' },
      { label: '研三', value: '研三' }
    ]
  },
  {
    label: '方向',
    value: '方向',
    children: [
      { label: 'Java', value: 'Java' },
      { label: '前端', value: '前端' },
      { label: '后端', value: '后端' },
      { label: '移动端', value: '移动端' },
      { label: '人工智能', value: '人工智能' },
      { label: '大数据', value: '大数据' },
      { label: '云计算', value: '云计算' },
      { label: '区块链', value: '区块链' },
      { label: '物联网', value: '物联网' },
      { label: '游戏开发', value: '游戏开发' },
      { label: '运维', value: '运维' },
      { label: '测试', value: '测试' },
      { label: '产品经理', value: '产品经理' },
      { label: 'UI设计', value: 'UI设计' }
    ]
  }
]
// 当前显示（搜索后）的标签列表
const tagList = ref(originalTagList)
// 选中标签列表，用于渲染用户标签
const selectedTagList: Ref<Array<TreeSelectValue>> = ref(['年级', user.value.tags])

/**
 * 确认标签选择操作
 */
const onTagsConfirm = () => {
  // 检查当前选中的标签列表与用户已有的标签列表是否相同
  // 如果不相同，才进行更新用户的标签列表的操作
  if (selectedTagList.value[1] !== user.value.tags) {
    // 更新用户的标签列表，并断言新标签列表为字符串数组
    user.value.tags = selectedTagList.value[1] as string[]
    // 输出更新后的用户标签列表至控制台
    console.log(user.value.tags)
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
</script>

<template>
  <!-- 用户信息 -->
  <t-cell-group bordered>
    <t-cell class="my-avatar" @click="avatarSheetVisible = true" title="头像" arrow hover>
      <template #note>
        <t-avatar shape="circle" size="large">
          {{ user.username.substring(0, 1) }}
        </t-avatar>
      </template>
    </t-cell>
    <t-cell
      title="昵称"
      @click="goEdit('username', '昵称', user.username)"
      :note="user.username"
      arrow
      hover
    />
    <t-cell title="性别" @click="genderState.show = true" :note="genderValueText" arrow hover />
    <t-cell
      title="手机号"
      @click="goEdit('phone', '手机号', user.phone)"
      :note="user.phone"
      arrow
      hover
    />
    <t-cell
      title="邮箱"
      @click="goEdit('email', '邮箱', user.email)"
      :note="user.email"
      arrow
      hover
    />
    <t-cell
      title="标签"
      @click="goEdit('email', '邮箱', user.email)"
      :note="user.tags.join('、')"
      arrow
      hover
    />
    <t-cell
      title="个人简介"
      @click="goEdit('profile', '个人简介', user.profile)"
      :note="user.profile.substring(0, 10).concat('...')"
      arrow
      hover
    />
    <t-cell title="加入时间" :note="user.createTime" />
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
    style="height: 50vh"
  >
    <div class="header">
      <div class="btn btn--cancel" aria-role="button" @click="tagPickerVisible = false">取消</div>
      <div class="title">选择标签</div>
      <div class="btn btn--confirm" aria-role="button" @click="onTagsConfirm">确定</div>
    </div>
    <div class="select-tree">
      <t-tree-select
        v-model="selectedTagList"
        :options="tagList"
        height="50vh"
        multiple
        filterable
      ></t-tree-select>
    </div>
  </t-popup>

  <!-- 头像选择弹窗 -->
  <t-action-sheet
    v-model="avatarSheetVisible"
    :items="avatarSheetItems"
    @selected="onActionSheetSelect"
    @cancel="avatarSheetVisible = false"
  />
</template>

<style lang="less" scoped>
.my-avatar {
  --td-avatar-text-large-font-size: 26px;
  //--td-avatar-bg-color: #0052d9;
  //--td-avatar-content-color: #fff;
}

// 标签选择弹窗样式
.tag-select-popup {
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
