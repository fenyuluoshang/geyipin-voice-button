<script setup lang="ts">
import Logo from '@/assets/logo.jpg'
import { useSearchStore } from '@/stores/search'
import { computed } from 'vue'
import { useToggle } from '@vueuse/core'

const searchStore = useSearchStore()

const searchInput = computed({
  get: () => searchStore.search,
  set: (val: string) => searchStore.increment(val)
})

const route = useRoute()

const [menuVisible, toggleMenuVisible] = useToggle()

const menuOnshowing = ref(false)

watch(
  menuVisible,
  (val) => {
    if (val) {
      menuOnshowing.value = val
    } else {
      setTimeout(() => {
        if (!menuVisible.value) {
          menuOnshowing.value = false
        }
      }, 500)
    }
  },
  {
    immediate: true
  }
)

const anchorStore = useAnchorConfigStore()

const { data: anchorConfig } = await useAsyncData('anchorConfigStore', async () => {
  return await anchorStore.get()
})

const title = computed(
  () => anchorStore.pageName[route.meta.page as keyof typeof anchorStore.pageName]
)
</script>

<template>
  <el-header
    class="header max-md:justify-between"
    :class="{
      'show-menu': menuOnshowing
    }"
  >
    <el-icon-menu class="w-[18px] text-white mr-[4px]" @click="toggleMenuVisible()" />
    <div class="flex h-full ml-[6px]">
      <div class="flex items-center">
        <div class="w-[30px] h-[30px] mr-2">
          <img alt="鸽一品" class="w-full h-full" :src="anchorConfig?.icon || Logo" />
        </div>
        <span class="text-white font-semibold max-md:text-[14px]">{{ title }}</span>
      </div>
      <div class="btn-groups ml-[4px] flex gap-[4px] items-center">
        <a
          v-if="anchorConfig?.biliId"
          :href="`https://space.bilibili.com/${anchorConfig.biliId}`"
          class="h-[26px] w-[26px] max-md:h-[22px] max-md:w-[22px] rounded-full bg-opacity-75 bg-white flex items-center justify-center"
          data-test-id="bili_link"
          alt="哔哩哔哩"
        >
          <el-icon size="18">
            <IconBilibiliIcon />
          </el-icon>
        </a>
      </div>
    </div>
    <div class="max-md:flex-1">
      <el-input
        v-model="searchInput"
        class="w-50 max-md:w-full m-2 search-input"
        :prefix-icon="ElIconSearch"
      />
    </div>
  </el-header>
  <layout-menu v-model:show="menuVisible" />
</template>

<style lang="scss" scoped>
@use 'element-plus/theme-chalk/src/mixins/function.scss' as *;

.header {
  z-index: 5;
  display: flex;
  align-items: center;
  top: 0;
  height: 48px;
  background: var(--header-color);
  position: fixed;
  width: 100%;

  &.show-menu {
    z-index: 1010;
  }
}

.dark .search-input {
  #{getCssVarName("input", "bg-color")}: #333;
}
</style>
