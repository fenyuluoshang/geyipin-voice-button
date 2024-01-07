<script lang="ts" setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/config'

const props = defineProps<{
  currentKey: string
}>()

const configStore = useConfigStore()

const voiceIndex = computed({
  get() {
    const data = configStore.config.keyboard_binding_map[props.currentKey]
    return data === -1 ? undefined : data.index
  },
  set(val) {
    configStore.setKey(props.currentKey, val)
  }
})
</script>

<template>
  <div class="mt-[4px]">
    {{ currentKey }}:
    <el-select v-model="voiceIndex">
      <el-option
        v-for="(item, index) in configStore.config.voices"
        :key="index"
        :value="index"
        :label="item.title"
      >
      </el-option>
    </el-select>
  </div>
</template>
