<script setup lang="ts">
import { computed, type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { TdTreeSelectProps, TreeSelectValue } from 'tdesign-mobile-vue'

const router = useRouter()

// 原始标签列表,用于获取标签列表的初始值及搜索后的标签列表
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
// 当前（搜索后）显示的标签列表，用于动态渲染树形标签选择器的选项
const tagList = ref(originalTagList)
// 标签搜索框关键字
const searchText = ref('')
/**
 * 搜索树形标签选择器中的标签
 * 当用户在搜索框输入文本并触发搜索时，此方法将被调用
 */
const onSearchTags = () => {
  // 根据原始标签列表和搜索文本创建一个新的标签列表
  tagList.value = originalTagList.map((parentTag: any) => {
    // 为每个父标签创建一个浅拷贝
    const tempParentTag: any = { ...parentTag }
    // 复制每个父标签的子标签列表
    const tempChildren = [...parentTag.children]
    // 过滤子标签列表，只保留标签值中包含搜索文本的子标签
    tempParentTag.children = tempChildren.filter((child) => child.value.includes(searchText.value))
    // 返回包含过滤后子标签的父标签拷贝
    return tempParentTag
  })
}

// 树形标签选择器中选中的标签的列表，用于渲染已选标签
const selectedTagList: Ref<Array<TreeSelectValue>> = ref(['年级', []])
// 计算已选标签列表
const tags = computed(() => {
  return selectedTagList.value[1]
})

/**
 * 用户点击标签关闭按钮时的处理函数
 * 该函数的作用是删除已选标签列表中的标签时，同步取消选中标签选择器中的对应标签
 * @param index 要移除的标签在数组中的索引
 */
function onClickClose(index: string | number) {
  ;(selectedTagList.value[1] as Array<TreeSelectValue>).splice(index as number, 1)
}

// 树形标签选择器选择状态改变监听事件，该值与标签选择器中的值双向绑定
const onChange: TdTreeSelectProps['onChange'] = (itemValue: TreeSelectValue) => {
  console.log(tags.value)
}

const onUserSearch = () => {
  // 跳转到用户列表页面，并携带已选标签列表
  router.push({
    path: '/result',
    query: {
      tags: tags.value as string[]
    }
  })
}
</script>

<template>
  <!-- 顶部导航栏 -->
  <t-navbar class="search" :fixed="false" @right-click="router.push('/')">
    <!-- 左侧搜索框区域 -->
    <template #left>
      <t-search
        v-model.trim="searchText"
        clearable
        shape="round"
        placeholder="请输入需要搜索的标签"
        @keyup.enter="onSearchTags"
        @onSearch="onSearchTags"
      ></t-search>
    </template>
    <!-- 右侧返回首页图标 -->
    <template #right>
      <t-icon name="home" size="24px" />
    </template>
  </t-navbar>

  <!-- 已选标签区域 -->
  <div class="selected-tag">
    <div class="summary">已选标签</div>
    <t-row gutter="10">
      <!-- selectedTagList 的第二项为已选标签列表 -->
      <!-- selectedTagList:[ '年级',[ '大一', '大二' ] ] -->
      <t-col v-for="(item, index) in selectedTagList[1]" :key="item" class="tag">
        <t-tag size="large" closable variant="light" @close="onClickClose(index)">
          {{ item }}
        </t-tag>
      </t-col>
    </t-row>
  </div>

  <!-- 标签选择器区域 -->
  <div class="select-tree">
    <!-- 匹配按钮 -->
    <t-button class="search-btn" block size="medium" theme="primary" @click="onUserSearch">
      匹配用户
    </t-button>
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
// 全局样式变量
@gray-light: #999;
@margin-top: 14px;

// 顶部导航栏
.search {
  // 搜索框右侧返回首页图标
  .t-icon-home {
    margin-right: 8px;
  }
}

// 区域标题
.summary {
  color: @gray-light;
}

// 已选标签列表区域
.selected-tag {
  padding: 16px;
  height: 40vh;
  overflow: auto;
  // 每列标签上外边距
  .tag {
    margin-top: @margin-top;
    margin-right: 6px;
  }
}

// 标签选择器区域
.select-tree {
  position: fixed;
  bottom: 0;
  height: 50vh;
  .search-btn {
    width: 92vw;
    margin: 0 auto;
  }

  .t-tree-select {
    width: 100vw;
  }
  .summary {
    margin: 16px 16px;
  }
}
</style>
