<script setup lang="ts">
import useUserStore from '~/stores/user'

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

watch(
  () => userStore.pending,
  (val) => {
    if (!val && !userStore.userStatus && route.path !== '/admin/sigin') {
      router.replace('/admin/sigin')
    }
  }
)

onMounted(() => {
  userStore.loadUserStatus()
})
</script>
<template>
  <div class="admin-layout h-[100vh]">
    <el-container class="h-full" v-loading="userStore.pending">
      <el-aside width="200px">
        <layout-admin-layout-menu class="h-full" />
      </el-aside>
      <el-container>
        <el-header class="flex flex-col">
          <div class="flex items-center h-full self-end">
            <div>{{ userStore.userStatus?.nickName }}</div>
          </div>
        </el-header>
        <el-main>
          <slot />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
