<script setup lang="ts">
import { HTTPResponseData, PageDTO } from '~/dtos'
import { EmoticonTagDTO } from '~/dtos/emoticon'
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
    const res = await nuxtApp.$axios.get<HTTPResponseData<PageDTO<EmoticonTagDTO>>>(
      '/api/emoticons/tags',
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

// function playVoice(source: string) {
//   const voice = `https://${pingStroe.config?.sourceDomain}/${source}`
//   if (audioTag.value) {
//     audioTag.value.src = voice
//     audioTag.value.play()
//   }
// }

const createShow = ref(false)
const emoticonTagEditId = ref<number | undefined>(undefined)
const emoticonTagEditShow = computed({
  get: () => !!emoticonTagEditId.value,
  set: (val: boolean) => {
    if (!val) {
      emoticonTagEditId.value = undefined
    }
  }
})
const emoticons = computed(() => {
  return data.value?.data.find((item) => item.id === emoticonTagEditId.value)?.emoticons || []
})

async function submitDelete(id: number) {
  const res = await nuxtApp.$axios.delete<HTTPResponseData>(`/api/emoticons/tag/${id}`)
  if (res.data.code === 1) {
    refresh()
  }
}
</script>
<template>
  <div class="h-full">
    <admin-target-anchor-selector v-model:active-anchor="activeAnchor" type="/emoticon/tags">
      <el-button @click="createShow = true" type="primary">增加</el-button>
    </admin-target-anchor-selector>
    <el-card v-loading="pending" class="mt-[12px]">
      <el-table row-key="id" :data="data?.data || []" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <el-table :data="props.row.emoticons" border class="mr-[12px]">
              <el-table-column prop="id" label="ID"></el-table-column>
              <el-table-column prop="source" label="表情">
                <template #default="{ row }">
                  <el-image
                    class="w-[100px] h-[100px]"
                    lazy
                    :src="`https://${pingStroe.config?.sourceDomain}/${row.source}`"
                    fit="cover"
                  />
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="emoticonTagEditId = row.id">添加表情</el-button>
            <el-popconfirm title="确认删除？" @confirm="submitDelete(row.id)">
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <admin-emoticon-create-emoticon-tag-dialog
      v-model="createShow"
      :active-anchor="activeAnchor!"
      @reload="refresh"
    />
    <admin-emoticon-tag-emoticon-edit-dialog
      v-model="emoticonTagEditShow"
      :active-anchor="activeAnchor!"
      :tag-id="emoticonTagEditId!"
      :emoticons="emoticons"
      @reload="refresh"
    />
  </div>
</template>
