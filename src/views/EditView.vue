<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { Dialog } from 'tdesign-mobile-vue'
const router = useRouter()
const route = useRoute()
const saveDisabled = ref(true)

const currentValue = ref(route.query.currentValue)
const onSave = () => {
  if (currentValue.value === '') {
    Dialog.confirm({
      title: '提示',
      content: `${route.query.editText}不能为空`,
      confirmBtn: '确认'
    })
    return
  }
}
</script>

<template>
  <t-navbar
    :fixed="false"
    @left-click="router.back()"
    left-arrow
    :title="'修改' + route.query.editText"
  >
    <template #right>
      <t-button class="save" size="small" @click="onSave" :disabled="saveDisabled" theme="primary"
        >保存</t-button
      >
    </template>
  </t-navbar>

  <div class="input-view">
    <div class="input">
      <t-input
        @focus="saveDisabled = false"
        :placeholder="'请设置你的' + route.query.editText"
        :maxcharacter="24"
        clearable
        v-model:value.trim="currentValue"
        borderless
      />
    </div>

    <div class="user-name-tip">
      <span>昵称最多24个字符(1个汉字表示2个字符长度)。</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.save {
  margin-right: 6px;
}
.input-view {
  height: 30vh;
  .input {
    width: 92vw;
    margin: 12px auto;
    --td-input-bg-color: #efefef;
    --td-input-border-radius: 5px;
    --td-input-vertical-padding: 10px;
  }
  .user-name-tip {
    width: 92vw;
    margin: 12px auto;
    color: #999;
    font-size: 14px;
  }
}
</style>
