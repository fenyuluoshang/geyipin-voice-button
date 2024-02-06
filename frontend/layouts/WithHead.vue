<script setup lang="ts">
import DefaultLayout from './default.vue'
</script>
<template>
  <default-layout>
    <div class="mt-[48px] flex-1 relative pb-[80px]">
      <layout-header />
      <slot></slot>
    </div>
  </default-layout>
</template>
