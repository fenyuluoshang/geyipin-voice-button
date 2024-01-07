<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { useVModel } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { computed, onMounted, ref, onBeforeUnmount } from 'vue'

const props = defineProps<{ modelValue: boolean }>()
const emits = defineEmits<{ (event: 'update:modelValue', val: boolean): void }>()

const visible = useVModel(props, 'modelValue', emits)

const configStore = useConfigStore()

const bindingKeys = computed(() => {
  return Object.keys(configStore.config.keyboard_binding_map)
})

const second_dialog_visible = ref(false)

function onKeyDown(ev: KeyboardEvent) {
  if (!second_dialog_visible.value || !visible.value) {
    return ev
  }

  const key = ev.key
  const keys = Object.keys(configStore.config.keyboard_binding_map)
  if (keys.includes(key)) {
    ElMessage.error('按键已存在')
    return ev
  }

  configStore.setKey(key, undefined)

  second_dialog_visible.value = false
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <el-dialog title="键盘绑定(Beta)" v-model="visible">
    <div>
      <keyboard-setting-item v-for="item in bindingKeys" :key="item" :current-key="item" />
      <el-button @click="second_dialog_visible = true" class="mt-[22px]">+</el-button>
    </div>
    <el-dialog v-model="second_dialog_visible">请点击 A-Z 任意按键，目前不支持组合键</el-dialog>
  </el-dialog>
</template>
