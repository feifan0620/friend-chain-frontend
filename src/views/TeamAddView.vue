<script setup lang="ts">
import { defineProps, onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  disabled: Boolean
})
const { disabled } = toRefs(props)

// upload
const onFail = ({ file, e }: { file: any; e: ProgressEvent }): any => {
  console.log('---onFail', file, e)
  return null
}

const onProgress = ({ file, percent, type, e }: any) => {
  console.log('---onProgress:', file, percent, type, e)
}
const onChangeUpload = (files: Array<any>, { e, response, trigger, index, file }: any) => {
  console.log('====onChange', files, e, response, trigger, index, file)
}
const onPreview = ({ file, e }: { file: any; e: MouseEvent }) => {
  console.log('====onPreview', file, e)
}
const onSuccess = ({ file, fileList, response, e }: any) => {
  console.log('====onSuccess', file, fileList, e, response)
}
const onRemove = ({ index, file, e }: any) => {
  console.log('====onRemove', index, file, e)
}
const onSelectChange = (files: Array<any>) => {
  console.log('====onSelectChange', files)
}
const action = 'https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo'
const files = ref([
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/example4.png',
    name: 'uploaded1.png',
    type: 'image'
  }
])

const formData = reactive({
  name: '',
  description: '',
  expireTime: '',
  maxNum: 3,
  status: '',
  password: '',
  photo: files
})
const form = ref(null)

const groupChangeFn = (value: any, context: { e: Event }) => {
  console.log(value, context)
}

const visible = ref(false)
const onChange = (value: string) => {
  console.log('change: ', value)
}

const onPick = (value: string) => {
  console.log('pick: ', value)
}

const onCancel = () => {
  console.log('cancel')
  visible.value = false
}

const onConfirm = (value: string) => {
  console.log('confirm: ', value)
  formData.expireTime = value
  visible.value = false
}

// 步进器
const onChangeStepper = ($event: number) => {
  formData.maxNum = $event
}

// form
const onReset = () => {
  console.log('===onReset')
}

const onSubmit = (e: any) => {
  console.log('===onSubmit', e)
}

const rules = {
  name: [{ validator: (val: any) => val !== '', message: '不能为空' }],
  status: [{ validator: (val: any) => val !== '', message: '不能为空' }],
  expireTime: [{ validator: (val: any) => val !== '', message: '不能为空' }],
  place: [{ validator: (val: any) => val !== '', message: '不能为空' }],
  description: [{ validator: (val: any) => val !== '', message: '不能为空' }]
}

onMounted(() => {
  // @ts-ignore
  form.value.setValidateMessage(rules)
})
</script>

<template>
  <div class="team-add">
    <t-navbar
      class="team-add-navbar"
      title="创建房间"
      :fixed="false"
      left-arrow
      @left-click="router.back()"
    />
    <t-form
      ref="form"
      :data="formData"
      :rules="rules"
      reset-type="initial"
      show-error-message
      label-align="left"
      :disabled="disabled"
      scroll-to-first-error="auto"
      @reset="onReset"
      @submit="onSubmit"
    >
      <t-form-item label="队伍图片" name="photo">
        <t-upload
          class="upload"
          :default-files="formData.photo"
          :max="1"
          :action="action"
          :on-fail="onFail"
          :on-progress="onProgress"
          :on-change="onChangeUpload"
          :on-preview="onPreview"
          :on-success="onSuccess"
          :on-remove="onRemove"
          :on-select-change="onSelectChange"
        >
        </t-upload>
      </t-form-item>
      <t-form-item label="队伍名称" name="name">
        <t-input v-model="formData.name" borderless placeholder="请输入队伍名称"></t-input>
      </t-form-item>
      <t-form-item label="队伍描述" name="description">
        <t-textarea
          v-model="formData.description"
          class="textarea"
          indicator
          :maxlength="50"
          placeholder="请输入队伍描述"
        ></t-textarea>
      </t-form-item>
      <t-form-item arrow label="过期时间" name="expireTime" content-align="right">
        <t-input
          v-model="formData.expireTime"
          borderless
          align="right"
          placeholder="请选择时间"
          @click="visible = true"
        ></t-input>
        <t-popup v-model="visible" placement="bottom">
          <t-date-time-picker
            :value="formData.expireTime"
            :mode="['date']"
            title="选择日期"
            start="2024-1-1"
            format="YYYY-MM-DD"
            @change="onChange"
            @pick="onPick"
            @confirm="onConfirm"
            @cancel="onCancel"
          />
        </t-popup>
      </t-form-item>
      <t-form-item label="最大人数" name="maxNum" content-align="right">
        <t-stepper v-model="formData.maxNum" theme="filled" @change="onChangeStepper" />
      </t-form-item>
      <t-form-item label="队伍状态" name="status">
        <t-radio-group v-model="formData.status" class="box" borderless @change="groupChangeFn">
          <t-radio :block="false" name="radio" value="1" label="公开" />
          <t-radio :block="false" name="radio" value="1" label="私有" />
          <t-radio :block="false" name="radio" value="2" label="加密" />
        </t-radio-group>
      </t-form-item>
      <div class="button-group">
        <t-button theme="primary" type="submit" size="large">创建</t-button>
        <t-button theme="default" variant="base" type="reset" size="large">重置</t-button>
      </div>
    </t-form>
  </div>
</template>

<style scoped lang="less">
.team-add-navbar {
  --td-navbar-bg-color: #f5f7fc;
}
t-form-item[name='photo'] {
}

.box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.upload {
  --td-upload-grid-columns: 3;
}
.textarea {
  height: 100px;
  width: 100%;
}
.button-group {
  background-color: var(--bg-color-demo, #fff);
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  position: relative;
  border-bottom: 0.5px solid #e7e7e7;

  .t-button {
    height: 32px;
    flex: 1;

    &:not(:last-child) {
      flex: 1;
      margin-right: 16px;
    }
  }
}
</style>
