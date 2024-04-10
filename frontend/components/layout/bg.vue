<script setup lang="ts">
import BG from '@/assets/bg.jpg'
import BG_DARK from '@/assets/bg-dark.jpg'

const isDark = useSharedDark()

const anchorStore = useAnchorConfigStore()

const { data: anchorConfig } = await useAsyncData('anchorConfigStore', async () => {
  return await anchorStore.get()
})

const bg_img = computed(() =>
  isDark.value ? anchorConfig.value?.bgImgDark || BG_DARK : anchorConfig.value?.bgImg || BG
)
</script>
<template>
  <client-only>
    <img :src="bg_img" class="bg" />
  </client-only>
</template>
<style lang="scss" scoped>
.bg {
  height: calc(100vh - 48px);
  width: 100%;
  position: fixed;
  left: 0;
  top: 48px;
  object-fit: cover;
  z-index: -2;
}
</style>
