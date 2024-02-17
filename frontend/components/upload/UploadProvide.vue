<script setup lang="ts">
import usePingStore from '~/stores/ping'
import useUserStore from '~/stores/user'

const userStore = useUserStore()
const pingStore = usePingStore()

await useAsyncData(async () => {
  await pingStore.loadPing()
  await userStore.loadUserStatus()
}, {
  server: false
})
</script>
<template>
  <slot v-if="userStore.userStatus" />
  <upload-login-form v-else />
</template>
