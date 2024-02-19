<script setup lang="ts">
const nuxtApp = useNuxtApp()
import { HTTPResponseData, PageDTO } from '@/dtos'
import { UserModelDTO } from '@/dtos/user'
import { useRole } from '~/composables/admin/useRole';

const page = ref(1)

const { data, refresh, pending } = await useAsyncData(async () => {
  const res = await nuxtApp.$axios.get<HTTPResponseData<PageDTO<UserModelDTO>>>(
    '/api/admin/users',
    {
      params: { page: page.value, pageSize: 20 }
    }
  )
  return res.data.data
})

const detailView = ref<UserModelDTO>()

const editPasswordRole = useRole('/user/password')
</script>
<template>
  <el-card>
    <template #header>
      <h2 class="ml-[16px] text-lg">用户管理</h2>
      <p class="ml-[16px] mt-[4px] text-sm text-[--text-color-secondary]">
        为了保障使用者的隐私，请谨慎在展示隐私信息的情况下使用截图，以免造成不必要的麻烦
      </p>
    </template>
    <el-table :data="data?.data || []" v-loading="pending">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column prop="name" label="用户名" width="260"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="200">
        <template #default="{ row }">
          <admin-phone-viewer v-if="row.phone" :value="row.phone" />
        </template>
      </el-table-column>
      <el-table-column prop="mail" label="邮箱" width="240">
        <template #default="{ row }">
          <admin-mail-viewer v-if="row.mail" :value="row.mail" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="{ row }">
          <el-link @click="detailView = row">详情</el-link>
          <el-link v-if="editPasswordRole">修改密码</el-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-end">
      <el-pagination
        class="mt-[12px]"
        v-model:current-page="page"
        :total="data?.total || 0"
        :page-size="20"
        layout="prev, pager, next"
        @change="() => refresh"
      ></el-pagination>
    </div>
    <admin-user-detail v-model:user="detailView" />
  </el-card>
</template>

<style lang="scss" scoped>
.el-link + .el-link {
  margin-left: 8px;
}
</style>
