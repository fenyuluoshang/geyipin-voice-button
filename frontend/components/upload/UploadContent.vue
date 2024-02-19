<script setup lang="ts">
import { FormInstance } from 'element-plus'
import FileUpload from './FileUpload.vue'

const nuxtApp = useNuxtApp()
const anchorStore = useAnchorConfigStore()

const fileVoiceUploadComponent = ref<InstanceType<typeof FileUpload>>()
const fileEmoticonUploadComponent = ref<InstanceType<typeof FileUpload>>()

function onVoiceFileClick() {
  fileVoiceUploadComponent.value?.selectFile()
}

function onEmoticonFileClick() {
  fileEmoticonUploadComponent.value?.selectFile()
}

const voiceFileError = ref<string>()
const emoticonFileError = ref<string>()

const voiceForm = ref({
  title: ''
})

const voiceFormRef = ref<FormInstance>()

async function onSubmit(type: 'voice' | 'emoticon') {
  const fileUploadComponent =
    type === 'voice' ? fileVoiceUploadComponent : fileEmoticonUploadComponent
  const fileError = type === 'voice' ? voiceFileError : emoticonFileError
  const form = type === 'voice' ? voiceForm : undefined
  const formRef = type === 'voice' ? voiceFormRef : undefined

  let check = true

  if (!fileUploadComponent.value?.fileValue) {
    fileError.value = '请选择文件'
    check = false
  } else {
    fileError.value = ''
  }

  if (formRef) {
    check = ((await formRef.value?.validate()) || false) && check
  }

  if (!check) {
    return
  }

  const file = await fileUploadComponent.value?.upload()

  const data = await nuxtApp.$axios.put(
    `/api/${type === 'voice' ? 'voice' : 'emoticons'}/uploaded_sts`,
    {
      file,
      title: form?.value.title,
      anchor: (await anchorStore.get())?.id
    }
  )
  if (data.data.code === 1) {
    ElMessage.success('上传成功')
    formRef?.value?.resetFields()
    fileUploadComponent.value?.resetField()
  } else {
    ElMessage.error('上传失败: ' + data.data.msg)
  }
}
</script>
<template>
  <el-card>
    <template #header><h2 class="ml-[16px] text-lg">上传音频</h2></template>
    <el-form ref="voiceFormRef" label-width="100px" :model="voiceForm">
      <el-form-item
        label="音频标题"
        prop="title"
        :rules="[{ required: true, message: '请输入音频名称' }]"
      >
        <el-input v-model="voiceForm.title" />
      </el-form-item>
      <el-form-item label="选择音频" required :error="voiceFileError">
        <div class="flex items-center">
          <el-button @click="onVoiceFileClick">选择文件</el-button>
          <span class="ml-[8px]">{{ fileVoiceUploadComponent?.fileValue?.name }}</span>
          <file-upload ref="fileVoiceUploadComponent" file-type="voice" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('voice')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="mt-[24px]">
    <template #header><h2 class="ml-[16px] text-lg">上传表情包</h2></template>
    <el-form label-width="100px">
      <el-form-item label="选择图片" required :error="emoticonFileError">
        <div class="flex items-center">
          <el-button @click="onEmoticonFileClick">选择文件</el-button>
          <span class="ml-[8px]">{{ fileEmoticonUploadComponent?.fileValue?.name }}</span>
          <file-upload ref="fileEmoticonUploadComponent" file-type="emoticon" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('emoticon')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
