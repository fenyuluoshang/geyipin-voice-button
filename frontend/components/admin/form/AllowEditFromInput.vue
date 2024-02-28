<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

const prop = withDefaults(defineProps<{
  modelValue: string,
  disabled?: boolean
}>(), {
  disabled: false
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const value = useVModel(prop, 'modelValue', emit)

const edit = ref(false)
</script>

<template>
  <div class="flex items-center" @keydown.enter="edit = false">
    <template v-if="edit && !disabled">
      <slot name="input">
        <el-input v-model="value" />
      </slot>
    </template>
    <template v-else>
      <slot name="value">
        <span>{{ value }}</span>
      </slot>
      <el-link v-if="!disabled" class="ml-[8px]" @click="edit = true">
        <el-icon>
          <el-icon-edit />
        </el-icon>
      </el-link>
    </template>
  </div>
</template>
