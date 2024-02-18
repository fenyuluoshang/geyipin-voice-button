<script setup lang="ts">
import { computed } from 'vue'

definePageMeta({
  layout: computed(() => {
    const route = useRoute()
    const url = useRequestURL()
    const path = route?.path || url.pathname

    if (path.startsWith('/admin/sigin')) {
      return 'default'
    }
    return 'admin-layout'
  })
})
</script>

<template>
  <NuxtPage />
</template>
