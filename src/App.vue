<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
useToggle(isDark)
</script>

<template>
  <layout-header></layout-header>
  <div class="mt-[48px] flex-1 relative pb-[80px]"><router-view /></div>
  <layout-footer></layout-footer>
</template>
