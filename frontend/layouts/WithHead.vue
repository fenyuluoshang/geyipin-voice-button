<script setup lang="ts">
import DefaultLayout from './default.vue'
</script>
<template>
  <default-layout>
    <layout-header />
    <slot></slot>
  </default-layout>
</template>