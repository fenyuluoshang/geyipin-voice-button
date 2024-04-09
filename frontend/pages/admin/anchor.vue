<script setup lang="ts">
import { useRole, useRoleBatch } from '~/composables/admin/useRole'
import { HTTPResponseData } from '~/dtos'
import { AnchorDTO } from '~/dtos/anchor'

const nuxtApp = useNuxtApp()

const { data, refresh, pending } = await useAsyncData(
  async () => {
    const res = await nuxtApp.$axios.get<HTTPResponseData<AnchorDTO[]>>('/api/anchor/all', {})
    return res.data.data
  },
  {
    lazy: true
  }
)

const createAnchorRole = useRole('/anchor/create')

const editRole = useRoleBatch(
  computed(() => {
    return (data.value || []).map((item) => `/anchor/${item.id}/edit`)
  })
)
</script>
<template>
  <div class="h-full">
    <el-card class="mt-[12px]">
      <template #header>
        <div class="relative">
          <h2 class="ml-[16px] text-lg">主播管理</h2>
          <p class="ml-[16px] mt-[4px] text-sm text-[--text-color-secondary]">页面配置项也在这里</p>
          <el-button type="primary" class="absolute bottom-0 right-0" v-if="createAnchorRole"
            >新建主播</el-button
          >
        </div>
      </template>
      <el-table :data="data || []">
        <el-table-column prop="id" label="id" width="80px" />
        <el-table-column prop="anchorName" label="主播" />
        <el-table-column prop="anchorTitle" label="主播称呼" />
        <el-table-column prop="pathName" label="路径" />
        <el-table-column prop="biliId" label="bilibili UID" />
        <el-table-column label="操作">
          <template #default="{ $index }">
            <el-link type="primary" :disabled="!editRole[$index]">编辑</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
