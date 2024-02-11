<script setup lang="ts">
import useUserStore from '~/stores/user'

const nuxtApp = useNuxtApp()
onBeforeMount(() => {
  const mainDomain = nuxtApp.$config.public.MAIN_DOMAIN
  if (location.host !== mainDomain) {
    const url = new URL('/admin', `http://${mainDomain}`)
    console.log(url)
    location.replace(url)
  }
})

const userStore = useUserStore()

const { pending } = await useAsyncData(async () => {
  await userStore.loadUserStatus()
})

onMounted(() => {
  
})
</script>
<template>
  <div class="admin-layout h-[100vh]">
    <slot v-if="userStore.userStatus && !pending" />
    <el-container v-else-if="!pending">
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
