<script setup lang="ts">
import { useToggle } from '@vueuse/core';

const props = defineProps<{
  value: string
}>()

const [view, toggleView] = useToggle(false)

const hideValue = computed(() => {
  return props.value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
})

function onIconClick() {
  toggleView()
}
</script>
<template>
  <div class="flex items-center">
    <span>{{ view ? value : hideValue }}</span>
    <el-link class="ml-[6px]" @click="onIconClick">
      <el-icon>
        <el-icon-hide v-if="view" />
        <el-icon-view v-else />
      </el-icon>
    </el-link>
  </div>
</template>
