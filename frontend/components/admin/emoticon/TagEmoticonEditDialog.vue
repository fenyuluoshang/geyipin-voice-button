<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { HTTPResponseData, PageDTO } from '~/dtos'
import { EmoticonDTO } from '~/dtos/emoticon'
import usePingStore from '~/stores/ping'

const emit = defineEmits<{
  (event: 'onUpdate:modelValue', val: boolean): void
  (event: 'reload'): void
}>()

const props = defineProps<{
  modelValue: boolean
  activeAnchor: number
  tagId: number
  emoticons: EmoticonDTO[]
}>()

const show = useVModel(props, 'modelValue', emit)

const nuxtApp = useNuxtApp()

const { data, refresh } = await useAsyncData(
  async () => {
    if (!props.activeAnchor) {
      return {
        total: 0,
        data: []
      }
    }
    const res = await nuxtApp.$axios.post<HTTPResponseData<PageDTO<EmoticonDTO>>>(
      '/api/emoticons/list',
      {
        anchorId: props.activeAnchor,
        pageSize: 0,
        page: 1
      }
    )
    return res.data.data
  },
  {
    lazy: true
  }
)

const value = ref<number[]>([])

watch(
  () => props.activeAnchor,
  () => refresh(),
  { immediate: true }
)

watch(
  () => props.emoticons,
  () => {
    value.value = props.emoticons.map((item) => item.id)
  },
  { immediate: true }
)

async function submit() {
  await nuxtApp.$axios.post('/api/emoticons/tag/emoticons', {
    tagId: props.tagId,
    emoticonsId: value.value
  })
  emit('reload')
  show.value = false
}

const pingStroe = usePingStore()

function checkItem(id: number, ev: boolean) {
  if (ev) {
    value.value.push(id)
  } else {
    const index = value.value.findIndex((item) => item === id)
    if (index !== -1) {
      value.value.splice(index, 1)
    }
  }
}
</script>
<template>
  <el-dialog v-model="show" class="max-w-[50vw]" title="编辑音频和标签">
    <div class="flex flex-wrap">
      <div
        v-for="item in data?.data || []"
        :key="item.id"
        class="w-[100px] h-[100px] relative overflow-hidden"
      >
        <el-checkbox
          class="absolute top-0 left-0"
          :value="item.id"
          :data-test-id="item.id"
          :checked="value.includes(item.id)"
          @update:model-value="checkItem(item.id, $event as boolean)"
        />
        <div class="absolute top-0 left-0">
          <el-image
            class="w-[100px] h-[100px]"
            lazy
            :src="`https://${pingStroe.config?.sourceDomain}/${item.source}`"
            fit="cover"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submit">submit</el-button>
      </div>
    </template>
  </el-dialog>
</template>
