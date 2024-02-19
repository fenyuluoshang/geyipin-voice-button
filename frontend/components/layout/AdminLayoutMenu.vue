<script setup lang="ts">
import useUserStore from '~/stores/user'

const route = useRoute()
const userStore = useUserStore()
useHead({
  title: 'DD 按钮站 管理面板'
})
</script>
<template>
  <el-menu
    router
    :default-active="route.path"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <div class="px-[12px] py-[8px] text-center text-slate-100">
      <p>DD 按钮站 管理面板</p>
      <p class="text-sm text-slate-300">make with <span class="text-red-600">♥</span> by fenyu</p>
      <p class="text-xs text-slate-300">© 2024</p>
      <p class="mt-[8px]">当前用户：</p>
      <p v-if="userStore.userStatus">
        {{ userStore.userStatus?.nickName }}
      </p>
    </div>
    <el-menu-item index="/admin/home">
      <el-icon><el-icon-house /></el-icon>
      <span>主页</span>
    </el-menu-item>
    <el-menu-item index="/admin/anchor">
      <el-icon><el-icon-video-camera /></el-icon>
      <span>主播</span>
    </el-menu-item>
    <el-sub-menu index="/admin/voice">
      <template #title>
        <el-icon><icon-audio-icon /></el-icon>
        <span>音频</span>
      </template>
      <el-menu-item index="/admin/voice/upload">上传</el-menu-item>
      <el-menu-item index="/admin/voice/check">审核</el-menu-item>
      <el-menu-item index="/admin/voice/tags">标签管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/admin/emoticon">
      <template #title>
        <el-icon><icon-emoticon-icon /></el-icon>
        <span>表情包</span>
      </template>
      <el-menu-item index="/admin/emoticon/upload">上传</el-menu-item>
      <el-menu-item index="/admin/emoticon/check">审核</el-menu-item>
      <el-menu-item index="/admin/emoticon/tags">标签管理</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/admin/user">
      <el-icon><el-icon-user /></el-icon>
      <span>用户</span>
    </el-menu-item>
    <el-menu-item index="/admin/system">
      <el-icon><el-icon-setting /></el-icon>
      <span>系统配置</span>
    </el-menu-item>
  </el-menu>
</template>
