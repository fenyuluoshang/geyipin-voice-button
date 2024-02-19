<script setup lang="ts">
import OSS from 'ali-oss'

const nuxtApp = useNuxtApp()

const props = defineProps<{
  fileType: 'voice' | 'emoticon' | 'image'
}>()

const fileInput = ref<HTMLInputElement>()
const fileValue = ref<File>()

function onFileSelected() {
  fileValue.value = fileInput.value?.files?.[0]
}

function clickFileInput() {
  fileInput.value?.click()
}

const inputAccept = computed(() => {
  switch (props.fileType) {
    case 'voice':
      return 'audio/*'
    case 'emoticon':
      return 'image/*'
    default:
      return 'image/*'
  }
})

async function upload() {
  if (!fileValue.value) {
    return undefined
  }

  const sts = await nuxtApp.$axios.get('/api/file/upload/sts?type=' + props.fileType)
  const fileNameSub = fileValue.value.name.split('.')
  const suffix = fileNameSub[fileNameSub.length - 1]
  const fileName = `${sts.data.data.path}.${suffix}`

  const client = new OSS({
    endpoint: sts.data.data.endpoint,
    accessKeyId: sts.data.data.AccessKeyId,
    accessKeySecret: sts.data.data.AccessKeySecret,
    bucket: sts.data.data.bucket,
    stsToken: sts.data.data.SecurityToken
  })
  return (await client.put(fileName, fileValue.value, {})).name
}

function resetField() {
  fileValue.value = undefined
  if(fileInput.value) {
    fileInput.value.value = ''
  }
}

defineExpose({
  fileValue,
  selectFile: clickFileInput,
  upload,
  resetField
})
</script>

<template>
  <input
    ref="fileInput"
    type="file"
    style="display: none"
    @change="onFileSelected"
    :accept="inputAccept"
  />
</template>
