<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const visible = useVModel(props, 'modelValue', emit)
</script>

<template>
  <el-drawer v-model="visible" direction="btt" :with-header="false">
    <h1 class="title">投稿</h1>
    <div>
      <a
        class="submit-link"
        href="mailto:gzj0078@icloud.com?subject=[天才鸽按钮]投稿"
        target="_blank"
        >邮件投稿</a
      >
      <a
        class="submit-link"
        href="https://wj.qq.com/s2/13991165/8aa2/"
        target="_blank"
        >腾讯问卷</a
      >
      <!-- <a
        class="submit-link"
        target="_blank"
        >Github</a
      > -->
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.title {
  font-size: 1.2rem;
}

.submit-link {
  margin-left: 5px;
  &:nth-child(1) {
    margin-left: 0;
  }
}
</style>
