<script setup lang="ts"></script>
<template>
  <el-menu>
    <el-menu-item index="1">
      <el-icon><el-icon-house /></el-icon>
      <span>主页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><el-icon-video-camera /></el-icon>
      <span>主播</span>
    </el-menu-item>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><icon-audio-icon /></el-icon>
        <span>音频</span>
      </template>
      <el-menu-item index="3-1">上传</el-menu-item>
      <el-menu-item index="3-2">审核</el-menu-item>
      <el-menu-item index="3-3">标签管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><icon-emotion-icon /></el-icon>
        <span>表情包</span>
      </template>
      <el-menu-item index="4-1">上传</el-menu-item>
      <el-menu-item index="4-2">审核</el-menu-item>
      <el-menu-item index="4-3">标签管理</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="5">
      <el-icon><el-icon-user /></el-icon>
      <span>用户</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><el-icon-setting /></el-icon>
      <span>系统配置</span>
    </el-menu-item>
  </el-menu>
</template>
