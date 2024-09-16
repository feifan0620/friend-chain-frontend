<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { TdTreeSelectProps, TreeSelectValue } from 'tdesign-mobile-vue'

const router = useRouter()

// 返回首页
const goHome = () => {
  router.push('/')
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

// 标签搜索关键字
const searchText = ref('')
// 标签搜索
const onSearch = () => {
  tagList.value = originalTagList.map((parentTag: any) => {
    const tempParentTag: any = { ...parentTag }
    const tempChildren = [...parentTag.children]
    // const iterableParentTag = Array.isArray(parentTag) ? parentTag : []
    tempParentTag.children = tempChildren.filter((child) => child.value.includes(searchText.value))
    return tempParentTag
  })
}

// 已选标签列表标签取消选中监听事件
function onClickClose(index: string) {
  ;(selectedTagList.value[1] as any).splice(index, 1)
}

// 选中标签列表，用于渲染已选标签
const selectedTagList: Ref<Array<TreeSelectValue>> = ref(['年级', ['大一']])
// 树形选择器标签选择状态改变监听事件
const onChange: TdTreeSelectProps['onChange'] = (itemValue: TreeSelectValue) => {
  console.log(itemValue)
}
</script>

<template>
  <t-navbar class="search" :fixed="false" @right-click="goHome">
    <template #left>
      <t-search
        v-model.trim="searchText"
        :clearable="true"
        shape="round"
        placeholder="请输入需要搜索的标签"
        @keyup.enter="onSearch"
        @onSubmit="onSearch"
      ></t-search>
    </template>
    <template #right>
      <t-icon name="home" size="24px" />
    </template>
  </t-navbar>

  <div class="select-tag">
    <div class="summary">已选标签</div>
    <t-row gutter="10">
      <t-col v-for="(item, index) in selectedTagList[1]" :key="item" span="6" class="tag">
        <t-tag closable variant="light" @close="onClickClose(index)">
          {{ item }}
        </t-tag>
      </t-col>
    </t-row>
  </div>
  <div class="select-tree">
    <div class="summary">标签选择</div>
    <t-tree-select
      v-model="selectedTagList"
      :options="tagList"
      height="50vh"
      multiple
      filterable
      @change="onChange"
    ></t-tree-select>
  </div>
</template>

<style lang="less" scoped>
.t-icon-home {
  margin-right: 8px;
}
.summary {
  color: #999;
}
.select-tag {
  padding: 16px;
  .tag {
    margin-top: 14px;
  }
}
.select-tree {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .summary {
    margin: 16px;
  }
}
</style>
