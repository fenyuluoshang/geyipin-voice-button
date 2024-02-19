<script setup lang="ts">
import FileUpload from '~/components/upload/FileUpload.vue'

const activeAnchor = ref<number>()
const fileUploadComponent = ref<InstanceType<typeof FileUpload>>()

function onClick() {
  fileUploadComponent.value?.selectFile()
}

const fileError = ref<string>()

function fileCheck() {
  if (!fileUploadComponent.value?.fileValue) {
    fileError.value = '请选择文件'
    return false
  }
  return true
}

const nuxtApp = useNuxtApp()

async function submit() {
  try {
    if (!fileCheck()) {
      return
    }
    const file = await fileUploadComponent.value?.upload()
    const data = await nuxtApp.$axios.put('/api/admin/upload', {
      file: file,
      anchorId: activeAnchor.value,
      type: 'emoticon'
    })
    if (data.data.code === 1) {
      ElMessage.success('上传成功')
      fileUploadComponent.value?.resetField()
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
    <admin-target-anchor-selector v-model:active-anchor="activeAnchor" type="/emoticon/update" />
    <el-card class="mt-[12px]">
      <template #header>
        <h2 class="ml-[16px] text-lg">上传表情包</h2>
        <p class="ml-[16px] text-sm text-[--text-color-regular]">
          <span class="text-[--text-color-primary]">请注意</span>:
          管理员端上传文件将不需要审核，直接展示在前台界面，请务必对文件完成检查后操作。
        </p>
      </template>
      <el-form label-width="80px" class="max-w-[600px]">
        <el-form-item label="选择图片" required :error="fileError">
          <div class="flex items-center">
            <el-button @click="onClick">选择文件</el-button>
            <span class="ml-[8px]">{{ fileUploadComponent?.fileValue?.name }}</span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="!activeAnchor" type="primary" @click="submit">上传</el-button>
        </el-form-item>
      </el-form>
      <file-upload ref="fileUploadComponent" file-type="emoticon" />
    </el-card>
    <el-card class="mt-[12px]"></el-card>
  </div>
</template>
