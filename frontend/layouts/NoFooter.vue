<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'NoFooterLayout'
})

const configStore = useConfigStore()

useHead({
  style: computed(() => [
    {
      innerHTML: `:root{ --primary-color: ${configStore.config.primary_color}; --second-color: ${configStore.config.second_color}; }`
    },
    {
      innerHTML: `.dark{ --primary-color: ${configStore.config.primary_color_dark}; --second-color: ${configStore.config.second_color_dark}; }`
    }
  ])
})

</script>