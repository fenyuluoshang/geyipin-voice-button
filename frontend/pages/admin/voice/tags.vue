<script setup lang="ts">
import { HTTPResponseData, PageDTO } from '~/dtos'
import { VoiceTagDTO } from '~/dtos/voice'
import usePingStore from '~/stores/ping'

const activeAnchor = ref<number>()

const nuxtApp = useNuxtApp()

const page = ref(1)

const { data, refresh, pending } = await useAsyncData(
  async () => {
    if (!activeAnchor.value) {
      return {
        total: 0,
        data: []
      }
    }
    const res = await nuxtApp.$axios.get<HTTPResponseData<PageDTO<VoiceTagDTO>>>(
      '/api/voice/tags',
      {
        params: {
          anchorId: activeAnchor.value,
          pageSize: 20,
          page: page.value,
          includes: ['voice']
        }
      }
    )
    return res.data.data
  },
  {
    lazy: true
  }
)

watch(
  activeAnchor,
  () => {
    refresh()
  },
  { immediate: true }
)

const pingStroe = usePingStore()

const audioTag = ref<HTMLAudioElement>()

function playVoice(source: string) {
  const voice = `https://${pingStroe.config?.sourceDomain}/${source}`
  if (audioTag.value) {
    audioTag.value.src = voice
    audioTag.value.play()
  }
}

const createShow = ref(false)
const voiceTagEditId = ref<number | undefined>(undefined)
const voiceTagEditShow = computed({
  get: () => !!voiceTagEditId.value,
  set: (val: boolean) => {
    if (!val) {
      voiceTagEditId.value = undefined
    }
  }
})
const voices = computed(() => {
  return data.value?.data.find((item) => item.id === voiceTagEditId.value)?.voices || []
})

async function submitDelete(id: number) {
  const res = await nuxtApp.$axios.delete<HTTPResponseData>(`/api/voice/tag/${id}`)
  if (res.data.code === 1) {
    refresh()
  }
}
</script>
<template>
  <div class="h-full">
    <admin-target-anchor-selector v-model:active-anchor="activeAnchor" type="/voice/tags">
      <el-button @click="createShow = true" type="primary">增加</el-button>
    </admin-target-anchor-selector>
    <el-card v-loading="pending" class="mt-[12px]">
      <el-table row-key="id" :data="data?.data || []" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <el-table :data="props.row.voices" border class="mr-[12px]">
              <el-table-column prop="id" label="ID"></el-table-column>
              <el-table-column prop="title" label="标题"></el-table-column>
              <el-table-column prop="source" label="音频源">
                <template #default="{ row }">
                  <el-button type="primary" @click="playVoice(row.source)">播放</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="playTime" label="播放次数"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="voiceTagEditId = row.id">添加音频</el-button>
            <el-popconfirm title="确认删除？" @confirm="submitDelete(row.id)">
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <audio ref="audioTag" />
    </el-card>
    <admin-voice-create-voice-dialog
      v-model="createShow"
      :active-anchor="activeAnchor!"
      @reload="refresh"
    />
    <admin-voice-tag-voice-edit-dialog
      v-model="voiceTagEditShow"
      :active-anchor="activeAnchor!"
      :tag-id="voiceTagEditId!"
      :voices="voices"
      @reload="refresh"
    />
  </div>
</template>
