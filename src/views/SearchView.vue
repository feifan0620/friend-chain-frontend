<script setup lang="ts">
import { computed, type Ref, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { TdTreeSelectProps, TreeSelectValue } from 'tdesign-mobile-vue'
import { TAGS_LISTS } from '@/constans'
const router = useRouter()

// 原始标签列表,用于获取标签选择器的初始值及搜索后的标签选择器选项
const originalTagList = TAGS_LISTS
// 当前（搜索后）显示的标签列表，用于动态渲染标签选择器的选项
const tagList = ref(originalTagList)
// 标签搜索框关键字
const searchText = ref('')

const searchDisabled = ref(true)
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
// 树形标签选择器中选中的标签的列表，用于渲染已选标签列表
const selectedTagList: Ref<Array<TreeSelectValue>> = ref(['年级', []])
// 计算已选标签数组
const selectedTags = computed(() => {
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
  console.log(selectedTags.value)
}

watch(
  selectedTagList,
  () => {
    if ((selectedTagList.value[1] as string[]).length > 0) {
      searchDisabled.value = false
    } else {
      searchDisabled.value = true
    }
  },
  { deep: true }
)

const onUserSearch = () => {
  // 跳转到用户列表页面，并携带已选标签列表
  router.push({
    path: '/result',
    query: {
      tags: selectedTags.value as string[]
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
    <t-button
      class="search-btn"
      :disabled="searchDisabled"
      block
      size="medium"
      theme="primary"
      @click="onUserSearch"
    >
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
