<template>
  <el-main>
    <el-timeline>
      <el-timeline-item timestamp="2024-01-15">
        <el-card>
          <h2 class="text-lg text-[--text-color-regular] font-bold mb-2">V0.0.1-alpha-3</h2>
          <h2 class="mb-2">增加表情包页</h2>
          <ul class="list-inside list-disc leading-6 mt-2 text-[--text-color-primary]">
            <li>Add Menu For New Feature 增加了下拉菜单以实现功能子页</li>
            <li>Add Emoticons Page 增加表情包站点</li>
          </ul>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2024-01-09">
        <el-card>
          <h2 class="text-lg text-[--text-color-regular] font-bold mb-2">V0.0.1-alpha-2.1</h2>
          <h2 class="mb-2">修复了一些问题</h2>
          <ul class="list-inside list-disc leading-6 mt-2 text-[--text-color-primary]">
            <li>Fixed Volume Setting For Safari 修复Safari下音量设置不生效的问题</li>
            <li>Change Volume For The Audio On Playing 支持修改播放中的音频的音量</li>
          </ul>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2024-01-08">
        <el-card>
          <h2 class="text-lg text-[--text-color-regular] font-bold mb-2">V0.0.1-alpha-2</h2>
          <h2 class="mb-2">音频播放基础功能</h2>
          <ul class="list-inside list-disc leading-6 mt-2 text-[--text-color-primary]">
            <li>Update Page Design 更新了一些页面设计</li>
            <li>Voice Volume Setting 音量保护设定</li>
            <li>Only One On Play Mode 单独播放模式(纯享模式)</li>
            <li>Simple Keyboard Bind Setting 简易的键盘绑定</li>
            <li>Some Easter Egg 增加了一些彩蛋</li>
          </ul>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2024-01-04">
        <el-card>
          <h2 class="text-lg text-[--text-color-regular] font-bold mb-2">V0.0.1-alpha-1</h2>
          <h2 class="mb-2">第一个Alpha版本发布</h2>
          <ul class="list-inside list-disc leading-6 text-[--text-color-primary]">
            <li>Voice Play 音频播放基础功能</li>
          </ul>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-main>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ChangeLogPage',
  title: ''
})

definePageMeta({
  layout: 'with-head'
})
</script>
