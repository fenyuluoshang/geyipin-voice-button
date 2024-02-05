<script setup lang="ts">
import { HAS_LOGIN, REFRESH_HAS_LOGIN, UPLOAD_PROVIDE_KEY } from './types'
import { useAxiosData } from '~/composables/useAxiosData'

const { data: uploadInfo } = await useAxiosData({
  url: '/api/file/upload_config',
  method: 'GET'
})

const { data: userInfo, refresh: refreshUserStatus } = await useAxiosData({
  url: '/api/user/status',
  method: 'GET'
})

provide(UPLOAD_PROVIDE_KEY, () => uploadInfo.value?.data)
provide(HAS_LOGIN, () => userInfo.value?.data?.code === 1)
provide(REFRESH_HAS_LOGIN, refreshUserStatus)
</script>
<template>
  <slot v-if="userInfo?.data?.code === 1" />
  <upload-login-form v-else />
</template>
