<script setup lang="ts">
const props = defineProps<{
  value: string
}>()

const view = ref(false)

const hideValue = computed(() => {
  const [user, domain] = props.value.split('@')
  const hiddenUser =
    user.length > 2 ? user[0] + '*'.repeat(user.length - 2) + user[user.length - 1] : user
  return `${hiddenUser}@${domain}`
})
</script>
<template>
  <div class="flex items-center">
    <span>{{ view ? value : hideValue }}</span>
    <el-link class="ml-[6px]" @click="view = !view">
      <el-icon>
        <el-icon-hide v-if="view" />
        <el-icon-view v-else />
      </el-icon>
    </el-link>
  </div>
</template>
