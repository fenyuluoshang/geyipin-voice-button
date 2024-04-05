<script setup lang="ts">
import usePingStore from '~/stores/ping'
import useUserStore from '~/stores/user'
import { useAdminAnchorDataStore } from '~/stores/admin'

const nuxtApp = useNuxtApp()
onBeforeMount(() => {
  const mainDomain = nuxtApp.$config.public.MAIN_DOMAIN
  if (location.host !== mainDomain) {
    const url = new URL('/admin', `http://${mainDomain}`)
    location.replace(url)
  }
})

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const pingStore = usePingStore()

watch(
  () => userStore.pending,
  (val) => {
    if (!val && !userStore.userStatus && route.path !== '/admin/sigin') {
      router.replace('/admin/sigin')
    }
  }
)

const adminAnchorStore = useAdminAnchorDataStore()

await useAsyncData(async () => {
  await Promise.all([userStore.loadUserStatus(), pingStore.loadPing()])
  if (userStore.userStatus) {
    await adminAnchorStore.load()
  }
})
</script>
<template>
  <div class="admin-layout h-[100vh]" v-loading="userStore.pending">
    <client-only>
      <el-container class="h-full">
        <el-aside width="200px">
          <layout-admin-layout-menu class="h-full" />
        </el-aside>
        <el-container>
          <el-main>
            <slot />
          </el-main>
        </el-container>
      </el-container>
    </client-only>
  </div>
</template>
