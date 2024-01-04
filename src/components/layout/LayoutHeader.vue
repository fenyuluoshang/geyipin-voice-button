<script setup lang="ts">
import Logo from '@/assets/logo.jpg'
import { useSearchStore } from '@/stores/search'
import { computed, inject } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { CONFIG_KEY } from '@/types/provide_keys'

const { search, increment } = useSearchStore()

const config = inject(CONFIG_KEY)

const searchInput = computed({
  get: () => search,
  set: (val: string) => increment(val)
})
</script>

<template>
  <el-header class="header">
    <div class="flex items-center">
      <div class="w-[30px] h-[30px] mr-2">
        <img alt="鸽一品" class="w-full h-full" :src="Logo" />
      </div>
      <span class="text-white font-semibold">鸽一品按钮</span>
    </div>
    <div class="btn-groups ml-[4px] flex gap-[4px]">
      <a
        v-if="config?.['bili-link']"
        :href="config?.['bili-link']"
        class="h-[26px] w-[26px] rounded-full bg-opacity-75 bg-white flex items-center justify-center"
        alt="哔哩哔哩"
      >
        <el-icon size="18">
          <BilibiliIcon />
        </el-icon>
      </a>
    </div>
    <div>
      <el-input v-model="searchInput" class="w-50 m-2" :prefix-icon="Search" />
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
.header {
  z-index: 5;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  height: 48px;
  background: var(--header-color);
}
</style>
