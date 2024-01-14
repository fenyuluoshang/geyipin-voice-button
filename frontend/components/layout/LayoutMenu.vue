<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  show: boolean
}>()

const emits = defineEmits<{
  (event: 'update:show', show: boolean): void
}>()

const show = useVModel(props, 'show', emits)

const route = useRoute()

const isMobile = useMobile()
</script>
<template>
  <client-only>
    <el-drawer
      :direction="isMobile ? 'ttb' : 'ltr'"
      v-model="show"
      :with-header="false"
      :show-close="false"
      :z-index="1000"
      class="menu-drawer"
    >
      <div class="mt-[48px]">
        <el-menu router :default-active="route.path" @click="show = false">
          <el-menu-item index="/" route="/">天才鸽按钮</el-menu-item>
          <el-menu-item index="/emoticons" route="/emoticons">天才鸽表情</el-menu-item>
          <el-menu-item index="/changelog" route="/changelog">更新日志</el-menu-item>
        </el-menu>
      </div>
    </el-drawer>
  </client-only>
</template>

<style lang="scss">
.menu-drawer {
  --el-drawer-padding-primary: 0;
}
</style>
