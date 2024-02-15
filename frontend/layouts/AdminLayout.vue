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

const router = useRouter()
const userStore = useUserStore()

watch(
  () => userStore.pending,
  (val) => {
    if (!val && !userStore.userStatus) {
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
        <el-menu class="h-full">
          <el-menu-item index="2">
            <el-icon><el-icon-menu /></el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <slot />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
