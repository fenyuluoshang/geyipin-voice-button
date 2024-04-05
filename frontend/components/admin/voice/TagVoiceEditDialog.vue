<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { HTTPResponseData, PageDTO } from '~/dtos'
import { VoiceDTO } from '~/dtos/voice'

const emit = defineEmits<{
  (event: 'onUpdate:modelValue', val: boolean): void
  (event: 'reload'): void
}>()

const props = defineProps<{
  modelValue: boolean
  activeAnchor: number
  tagId: number
  voices: VoiceDTO[]
}>()

const show = useVModel(props, 'modelValue', emit)

const nuxtApp = useNuxtApp()

const { data, refresh, pending } = await useAsyncData(
  async () => {
    if (!props.activeAnchor) {
      return {
        total: 0,
        data: []
      }
    }
    const res = await nuxtApp.$axios.post<HTTPResponseData<PageDTO<VoiceDTO>>>('/api/voice/list', {
      anchorId: props.activeAnchor,
      pageSize: 0,
      page: 1
    })
    return res.data.data
  },
  {
    lazy: true
  }
)

const options = computed(
  () =>
    data.value?.data.map((item) => ({
      key: item.id,
      label: item.title
    }))
)

const value = ref<number[]>([])

watch(
  () => props.activeAnchor,
  () => refresh(),
  { immediate: true }
)

watch(
  () => props.voices,
  () => {
    value.value = props.voices.map((item) => item.id)
  },
  { immediate: true }
)

async function submit() {
  await nuxtApp.$axios.post('/api/voice/tag/voices', {
    tagId: props.tagId,
    voiceIds: value.value
  })
  emit('reload')
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" class="max-w-[50vw]" title="编辑音频和标签">
    <el-transfer v-loading="pending" v-model="value" :data="options" />
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submit"> submit </el-button>
      </div>
    </template>
  </el-dialog>
</template>
