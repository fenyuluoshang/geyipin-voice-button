<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { HTTPResponseData } from '~/dtos'

const emit = defineEmits<{
  (event: 'onUpdate:modelValue', val: boolean): void
  (event: 'reload'): void
}>()

const props = defineProps<{
  modelValue: boolean
  activeAnchor: number
}>()

const show = useVModel(props, 'modelValue', emit)

const form = ref<{
  title: string
}>({
  title: ''
})

const nuxtApp = useNuxtApp()

async function submit() {
  const data = await nuxtApp.$axios.put<HTTPResponseData<'ok'>>('/api/emoticons/tag', {
    anchorId: props.activeAnchor,
    title: form.value.title
  })
  if (data.data.code === 1) {
    form.value.title = ''
    show.value = false
    emit('reload')
  }
}
</script>
<template>
  <el-dialog v-model="show" class="max-w-[50vw]" title="创建表情包标签">
    <el-form :model="form" label-width="160px" class="max-w-[500px]">
      <el-form-item label="标题" prop="title" required>
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
