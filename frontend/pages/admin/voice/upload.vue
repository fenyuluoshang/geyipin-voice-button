<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { fi } from 'element-plus/es/locale';
import FileUpload from '~/components/upload/FileUpload.vue'

const activeAnchor = ref<number>()
const fileUploadComponent = ref<InstanceType<typeof FileUpload>>()
const formRef = ref<FormInstance>()

const form = ref({
  name: ''
})

function onClick() {
  fileUploadComponent.value?.selectFile()
}

const fileError = ref<string>()

function fileCheck() {
  if (!fileUploadComponent.value?.fileValue) {
    fileError.value = '请选择文件'
    return false
  }
  fileError.value = ''
  return true
}

const nuxtApp = useNuxtApp()

async function submit() {
  try {
    let verify = fileCheck()
    verify = ((await formRef.value?.validate()) || false) && verify
    if (!verify) {
      return
    }
    const file = await fileUploadComponent.value?.upload()
    const data = await nuxtApp.$axios.put('/api/admin/upload', {
      file: file,
      anchorId: activeAnchor.value,
      title: form.value.name,
      type: 'voice',
    })
    if (data.data.code === 1) {
      ElMessage.success('上传成功')
      // formRef.value?.resetFields()
    } else {
      ElMessage.error('上传失败: ' + data.data.msg)
    }
  } catch (error) {
    ElMessage.error('上传失败')
  }
}
</script>
<template>
  <div class="h-full">
    <admin-target-anchor-selector v-model:active-anchor="activeAnchor" type="/voice/update" />
    <el-card class="mt-[12px]">
      <template #header>
        <h2 class="ml-[16px] text-lg">上传音频</h2>
        <p class="ml-[16px] text-sm text-[--text-color-regular]">
          <span class="text-[--text-color-primary]">请注意</span>:
          管理员端上传文件将不需要审核，直接展示在前台界面，请务必对文件完成检查后操作。
        </p>
      </template>
      <el-form ref="formRef" label-width="80px" class="max-w-[600px]" :model="form">
        <el-form-item
          label="音频名称"
          prop="name"
          :rules="[{ required: true, message: '请填写名称' }]"
        >
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="选择音频" required :error="fileError">
          <div class="flex items-center">
            <el-button @click="onClick">选择文件</el-button>
            <span class="ml-[8px]">{{ fileUploadComponent?.fileValue?.name }}</span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">上传</el-button>
        </el-form-item>
      </el-form>
      <file-upload ref="fileUploadComponent" file-type="voice" />
    </el-card>
    <el-card class="mt-[12px]"></el-card>
  </div>
</template>
