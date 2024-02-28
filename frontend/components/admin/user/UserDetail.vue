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
const editRole = useRole('/user/edit')
</script>
<template>
  <el-dialog v-model="visible" title="用户详情">
    <template v-if="visible">
      <el-form label-width="60">
        <el-form-item label="ID">
          {{ user.id }}
        </el-form-item>
        <el-form-item label="账户">
          <admin-form-allow-edit-from-input v-model="user.name" :disabled="!editRole" />
        </el-form-item>
        <el-form-item label="昵称">
          <admin-form-allow-edit-from-input v-model="user.nickName" :disabled="!editRole" />
        </el-form-item>
        <el-form-item label="邮箱">
          <admin-form-allow-edit-from-input v-model="user.mail" :disabled="!editRole">
            <template #value>
              <admin-mail-viewer v-if="user.mail" :value="user.mail" :disabled="!editRole" />
            </template>
          </admin-form-allow-edit-from-input>
        </el-form-item>
        <el-form-item label="手机号">
          <admin-form-allow-edit-from-input v-model="user.phone" :disabled="!editRole">
            <template #value>
              <admin-phone-viewer v-if="user.phone" :value="user.phone" />
            </template>
          </admin-form-allow-edit-from-input>
        </el-form-item>
        <el-form-item label="用户组">
          <admin-form-allow-edit-from-input v-model="user.group" :disabled="!editRole">
            <template #value>
              <span>{{ user.group?.title }}</span>
            </template>
          </admin-form-allow-edit-from-input>
        </el-form-item>
      </el-form>
      <template v-if="roleEditRole">
        <div class="w-[60px] text-end">权限</div>
        <div class="px-[40px]" v-if="user.group">
          <div>继承组</div>
          <div>
            <div v-for="item in user.group.roles || []" :key="item.id">{{ item.roleStr }}</div>
          </div>
        </div>
        <div class="px-[40px]">
          <div>用户所有</div>
          <div>
            <div v-for="item in user.roles || []" :key="item.id">{{ item.roleStr }}</div>
          </div>
        </div>
      </template>
    </template>
  </el-dialog>
</template>
