<script setup lang="ts">
import Logo from '@/assets/logo.jpg'
import { useSearchStore } from '@/stores/search'
import { useConfigStore } from '@/stores/config'
import { computed } from 'vue'

const searchStore = useSearchStore()
const config = useConfigStore()

const searchInput = computed({
  get: () => searchStore.search,
  set: (val: string) => searchStore.increment(val)
})

const route = useRoute()
</script>

<template>
  <el-header class="header max-md:justify-between">
    <div class="flex h-full">
      <div class="flex items-center">
        <div class="w-[30px] h-[30px] mr-2">
          <img alt="鸽一品" class="w-full h-full" :src="Logo" />
        </div>
        <span class="text-white font-semibold max-md:text-[14px]">{{ route.meta.title }}</span>
      </div>
      <div class="btn-groups ml-[4px] flex gap-[4px] items-center">
        <a
          v-if="config.config.bili_link"
          :href="config.config.bili_link"
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
}

.dark .search-input {
  #{getCssVarName("input", "bg-color")}: #333;
}
</style>
