<script setup lang="ts">
import { provide } from 'vue'
import { CONFIG_KEY } from '@/types/provide_keys'
import config from './voice-mapping.json'

provide(CONFIG_KEY, config)
</script>

<template>
  <layout-header></layout-header>
  <router-view />
</template>

<style scoped></style>
