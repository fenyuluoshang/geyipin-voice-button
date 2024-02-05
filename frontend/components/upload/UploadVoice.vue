<script setup lang="ts">
import OSS from 'ali-oss'

const nuxtApp = useNuxtApp()
const anchorStore = useAnchorConfigStore()
const fileInput = ref<HTMLInputElement>()

function onClick() {
  fileInput.value?.click()
}

const file = ref<File>()
const title = ref<string>('')

function onFileSelected() {
  file.value = fileInput.value?.files?.[0]
}

async function onSubmit() {
  if (!file.value || !title.value) {
    return
  }

  const sts = await nuxtApp.$axios.get('/api/file/sts?type=audio')
  const fileNameSub = file.value.name.split('.')
  const suffix = fileNameSub[fileNameSub.length - 1]
  const fileName = `${sts.data.data.path}.${suffix}`

  const client = new OSS({
    endpoint: sts.data.data.endpoint,
    accessKeyId: sts.data.data.AccessKeyId,
    accessKeySecret: sts.data.data.AccessKeySecret,
    bucket: sts.data.data.bucket,
    stsToken: sts.data.data.SecurityToken
  })
  const result = await client.put(fileName, file.value, {})
  console.log(result)
  
  await nuxtApp.$axios.put('/api/voice/uploaded_sts', {
    file: fileName,
    title: title.value,
    anchor: anchorStore.config?.id
  })

  ElMessage.success('上传成功，请等待人工审核')
}
</script>
<template>
  <el-card>
    <template #header><h2 class="ml-[16px] text-lg">上传音频</h2></template>
    <el-form label-width="100px">
      <el-form-item label="音频标题">
        <el-input v-model="title" />
      </el-form-item>
      <el-form-item label="选择音频">
        <el-button @click="onClick">选择音频</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
      <span v-if="file">{{ file?.name }}</span>
      <input
        ref="fileInput"
        type="file"
        style="display: none"
        @change="onFileSelected"
        accept="audio/*"
      />
    </el-form>
  </el-card>
</template>
