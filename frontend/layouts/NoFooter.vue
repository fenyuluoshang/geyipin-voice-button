<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'NoFooterLayout'
})

useColorInject()
</script>