<script setup lang="ts">
import OSS from 'ali-oss'

const nuxtApp = useNuxtApp()
const anchorStore = useAnchorConfigStore()
const fileAudioInput = ref<HTMLInputElement>()
const fileEmotionInput = ref<HTMLInputElement>()

function onFileCheckAudio() {
  fileAudioInput.value?.click()
}

function onFileCheckEmotion() {
  fileEmotionInput.value?.click()
}

const fileAudio = ref<File>()
const fileEmotion = ref<File>()
const title = ref<string>('')

function onFileSelectedAudio() {
  fileAudio.value = fileAudioInput.value?.files?.[0]
}
function onFileSelectedEmotion() {
  fileEmotion.value = fileEmotionInput.value?.files?.[0]
}

async function onSubmitAudio() {
  if (!fileAudio.value || !title.value) {
    return
  }

  const sts = await nuxtApp.$axios.get('/api/file/sts?type=audio')
  const fileNameSub = fileAudio.value.name.split('.')
  const suffix = fileNameSub[fileNameSub.length - 1]
  const fileName = `${sts.data.data.path}.${suffix}`

  const client = new OSS({
    endpoint: sts.data.data.endpoint,
    accessKeyId: sts.data.data.AccessKeyId,
    accessKeySecret: sts.data.data.AccessKeySecret,
    bucket: sts.data.data.bucket,
    stsToken: sts.data.data.SecurityToken
  })
  await client.put(fileName, fileAudio.value, {})
  await nuxtApp.$axios.put('/api/voice/uploaded_sts', {
    file: fileName,
    title: title.value,
    anchor: (await anchorStore.get())?.id
  })

  ElMessage.success('上传成功，请等待人工审核')
}

async function onSubmitEmotion() {
  if (!fileEmotion.value) {
    return
  }

  const sts = await nuxtApp.$axios.get('/api/file/sts?type=emotion')
  const fileNameSub = fileEmotion.value.name.split('.')
  const suffix = fileNameSub[fileNameSub.length - 1]
  const fileName = `${sts.data.data.path}.${suffix}`

  const client = new OSS({
    endpoint: sts.data.data.endpoint,
    accessKeyId: sts.data.data.AccessKeyId,
    accessKeySecret: sts.data.data.AccessKeySecret,
    bucket: sts.data.data.bucket,
    stsToken: sts.data.data.SecurityToken
  })
  await client.put(fileName, fileEmotion.value, {})
  await nuxtApp.$axios.put('/api/emoticons/uploaded_sts', {
    file: fileName,
    anchor: (await anchorStore.get())?.id
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
        <el-button @click="onFileCheckAudio">选择音频</el-button
        ><span v-if="fileAudio">{{ fileAudio.name }}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitAudio">提交</el-button>
      </el-form-item>
      <input
        ref="fileAudioInput"
        type="file"
        style="display: none"
        @change="onFileSelectedAudio"
        accept="audio/*"
      />
    </el-form>
  </el-card>
  <el-card class="mt-[24px]">
    <template #header><h2 class="ml-[16px] text-lg">上传表情包</h2></template>
    <el-form label-width="100px">
      <el-form-item label="选择图片">
        <el-button @click="onFileCheckEmotion">选择图片</el-button
        ><span v-if="fileEmotion">{{ fileEmotion.name }}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitEmotion">提交</el-button>
      </el-form-item>
      <input
        ref="fileEmotionInput"
        type="file"
        style="display: none"
        @change="onFileSelectedEmotion"
        accept="image/*"
      />
    </el-form>
  </el-card>
</template>
