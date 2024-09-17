<script setup lang="ts">
import router from '@/router'
import { reactive, type Ref, ref } from 'vue'
import type { TdTreeSelectProps, TreeSelectValue } from 'tdesign-mobile-vue'

// 用户信息
const user = {
  id: '1',
  username: 'Feifan',
  userAccount: 'feifan',
  avatarUrl: 'https://tdesign.gtimg.com/mobile/demos/avatar4.png',
  gender: 0,
  userPassword: '12345678',
  tags: ['Java', '前端', '大数据'],
  phone: '13123452345',
  email: '123456@qq.com',
  userCode: '10001',
  // 时间转换为字符串(不包含时分秒)
  createTime: new Date().toLocaleDateString()
}

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

const genderState = reactive({
  show: false,
  city: []
})

const onCancel = () => {
  genderState.show = false
}

const genderOptions = () => {
  return [
    {
      label: '男',
      value: '0'
    },
    {
      label: '女',
      value: '1'
    }
  ]
}

const visible = ref(false)
const onHide = () => (visible.value = false)

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
      { label: '大四', value: '大四' }
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
      { label: 'UI设计', value: 'UI设计' },
      { label: '其他', value: '其他' }
    ]
  }
]

// 当前显示（搜索后）标签列表
const tagList: Ref<any> = ref(originalTagList)
// 选中标签列表，用于渲染已选标签
const selectedTagList: Ref<Array<TreeSelectValue>> = ref(['年级', ['大一']])
// 树形选择器标签选择状态改变监听事件
const onChange: TdTreeSelectProps['onChange'] = (itemValue: TreeSelectValue) => {
  console.log(itemValue)
}

const avatarSheetVisible = ref(false)
const avatarSheetItems = ['选择图片', '拍照']
const onActionSheetSelect = (selectedItem: any) => {
  console.log(selectedItem)
}

const avatarImg = ref(['https://tdesign.gtimg.com/mobile/demos/avatar4.png'])
</script>

<template>
  <!-- 用户信息 -->
  <t-cell-group bordered>
    <t-cell class="my-avatar" @click="avatarSheetVisible = true" title="头像" arrow hover>
      <template #note>
        <t-avatar shape="circle" size="large" :image="user.avatarUrl">FF</t-avatar>
      </template>
    </t-cell>
    <t-cell
      title="昵称"
      @click="goEdit('username', '昵称', user.username)"
      :note="user.username"
      arrow
      hover
    />
    <t-cell
      title="性别"
      @click="genderState.show = true"
      :note="user.gender === 0 ? '男' : '女'"
      arrow
      hover
    />
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
    <t-cell title="标签" @click="visible = true" :note="user.tags.join('、')" arrow hover />
    <t-cell title="加入时间" :note="user.createTime" />
    <t-cell title="UID" :note="user.userCode" />
  </t-cell-group>

  <t-popup class="gender-popup" v-model="genderState.show" placement="bottom">
    <t-picker
      v-model="genderState.city"
      title="选择性别"
      @cancel="onCancel"
      :columns="genderOptions"
    />
  </t-popup>

  <t-popup class="tag-select-popup" v-model="visible" placement="bottom" style="height: 50vh">
    <div class="header">
      <div class="btn btn--cancel" aria-role="button" @click="onHide">取消</div>
      <div class="title">选择标签</div>
      <div class="btn btn--confirm" aria-role="button" @click="onHide">确定</div>
    </div>
    <div class="select-tree">
      <t-tree-select
        v-model="selectedTagList"
        :options="tagList"
        height="50vh"
        multiple
        filterable
        @change="onChange"
      ></t-tree-select>
    </div>
  </t-popup>

  <t-action-sheet
    v-model="avatarSheetVisible"
    :items="avatarSheetItems"
    @selected="onActionSheetSelect"
    @cancel="avatarSheetVisible = false"
  />
</template>

<style lang="less" scoped>
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
