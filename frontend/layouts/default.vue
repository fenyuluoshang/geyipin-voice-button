<template>
  <div>
    <slot />
    <layout-footer />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'DefaultLayout'
})

useColorInject()
</script>
