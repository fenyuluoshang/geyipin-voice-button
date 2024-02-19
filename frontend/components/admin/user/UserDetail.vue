<script lang="ts" setup>
import { UserModelDTO } from '@/dtos/user'
import { useVModel } from '@vueuse/core'
import { useRole } from '~/composables/admin/useRole'

const props = defineProps<{
  user: UserModelDTO | undefined
}>()

const emits = defineEmits<{
  (event: 'update:user', user: UserModelDTO | undefined): void
}>()

const user = useVModel(props, 'user', emits)

const visible = computed({
  get: () => !!user.value,
  set: (value: boolean) => {
    if (!value) {
      emits('update:user', undefined)
    }
  }
})

const roleEditRole = useRole('/user/role')
</script>
<template>
  <el-dialog v-model="visible" title="用户详情">
    <template v-if="visible">
      <div class="flex">
        <lable class="w-[120px]">ID: </lable>
        {{ user.id }}
      </div>
      <div class="flex"><lable class="w-[120px]">账户: </lable> {{ user.name }}</div>
      <div class="flex"><lable class="w-[120px]">昵称: </lable> {{ user.nickName }}</div>
      <div class="flex">
        <lable class="w-[120px]">手机号: </lable>
        <admin-phone-viewer v-if="user.phone" :value="user.phone" />
      </div>
      <div class="flex"><lable class="w-[120px]">用户组: </lable> {{ user.group?.title }}</div>
      <template v-if="roleEditRole">
        <div>权限</div>
        <div v-if="user.group">
          <div>继承组</div>
          <div>
            <div v-for="item in user.group.roles || []" :key="item.id">{{ item.roleStr }}</div>
          </div>
        </div>
        <div>
          <div>用户所有</div>
          <div>
            <div v-for="item in user.roles || []" :key="item.id">{{ item.roleStr }}</div>
          </div>
        </div>
      </template>
    </template>
  </el-dialog>
</template>
