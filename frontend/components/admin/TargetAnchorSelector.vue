import { useVModel } from '@vueuse/core';
<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { AnchorRoles } from '~/dtos/admin';
import { useAdminAnchorDataStore } from '~/stores/admin'

const props = defineProps<{
  activeAnchor: number | undefined,
  type: typeof AnchorRoles[number]
}>()

const emit = defineEmits<{
  (event: 'update:activeAnchor', value: number): void
}>()

const activeAnchor = useVModel(props, 'activeAnchor', emit)

const adminAnchorStore = useAdminAnchorDataStore()

const anchorList = computed(() => adminAnchorStore.map[props.type])

watch(
  anchorList,
  (value) => {
    if (value.length && activeAnchor.value === undefined) {
      activeAnchor.value = value[0].id
    }
    if (anchorList.value.find((item) => item.id === activeAnchor.value) === undefined) {
      if (anchorList.value.length === 0) {
        activeAnchor.value = undefined
      } else {
        activeAnchor.value = anchorList.value[0].id
      }
    }
  },
  { immediate: true }
)
</script>
<template>
  <el-card>
    <div class="flex items-center">
      <p>选择目标主播：</p>
      <el-select class="max-w-[300px]" v-model="activeAnchor">
        <el-option
          v-for="item in anchorList"
          :key="item.id"
          :label="item.anchorName"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
  </el-card>
</template>
