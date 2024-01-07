<script lang="ts" setup>
import { useConfigStore } from '@/stores/config'
import { computed, onMounted, ref } from 'vue'
import { ElScrollbar } from 'element-plus'

const configStore = useConfigStore()

const scrollbar = ref<typeof ElScrollbar>()

const voiceSetting = computed({
  get() {
    return configStore.config.low_voice_mode
  },
  set(val) {
    configStore.increment({ low_voice_mode: val })
  }
})

const onlyPlayOneSetting = computed({
  get() {
    return configStore.config.only_one_play_mode
  },
  set(val) {
    if (val) {
      configStore.increment({ keyboard_binding_mode: false, only_one_play_mode: true })
      return
    }
    configStore.increment({ only_one_play_mode: false })
  }
})

const keyboardModeSetting = computed({
  get() {
    return configStore.config.keyboard_binding_mode
  },
  set(val) {
    if (val) {
      configStore.increment({ keyboard_binding_mode: true, only_one_play_mode: false })
      return
    }
    configStore.increment({ keyboard_binding_mode: false })
  }
})

const keyboardSettingVisible = computed({
  get() {
    return configStore.config.in_setting
  },
  set(val) {
    configStore.increment({ in_setting: val })
  }
})

onMounted(() => {
  setTimeout(() => {
    if (scrollbar.value) {
      scrollbar.value.update()
    }
  }, 1000)
})
</script>

<template>
  <div>
    <div
      class="bg-[--bg-color] bg-opacity-80 p-[12px] rounded-[8px] flex config-panel max-sm:flex-col-reverse text-[--text-color-regular] font-[MuYao] text-lg"
    >
      <div class="flex-1 max-sm:hidden">
        <h2 class="text-2xl">主包可爱喵 新视频求点赞</h2>
        <el-scrollbar ref="scrollbar" always class="!h-[180px]">
          <div class="flex h-[180px] pb-[10px]">
            <iframe
              src="//player.bilibili.com/player.html?aid=368343925&bvid=BV1494y1M7tM&cid=1393239820&p=1"
              scrolling="no"
              border="0"
              frameborder="no"
              framespacing="0"
              allowfullscreen="true"
              class="float-left"
            />
            <img src="@/assets/qwq1.gif" class="float-left ml-[12px] select-none" />
            <img src="@/assets/qwq2.jpg" class="float-left ml-[12px] select-none" />
            <img src="@/assets/qwq3.jpg" class="float-left ml-[12px] select-none" />
          </div>
        </el-scrollbar>
      </div>
      <el-divider direction="vertical" class="!h-[unset] max-sm:hidden" />
      <div class="flex-1">
        <h2 class="text-2xl">关于本站</h2>
        <p>本站仅为爱好者自制作品，与主播不存在直接关联</p>
        <p>
          <span class="text-[--primary-color]">特别感谢广大粉丝和主播对本站做出的大力支持</span
          >，也希望大家玩的开心，有宝贵意见也欢迎通过各种渠道联系到我喵！
        </p>
        <p>关注鸽一品谢谢喵</p>
        <p class="font-sans text-sm">
          <a
            href="https://github.com/fenyuluoshang/geyipin-voice-button"
            class="hover:text-[--text-color-primary]"
            target="_blank"
          >
            <github-icon class="w-[20px] inline-block"></github-icon> geyipin-voice-button
          </a>
        </p>
        <p class="mt-[4px] font-sans text-xs text-[--text-color-secondary]">
          made in ♥ by Fenyu at 2024-01
        </p>
      </div>
      <el-divider direction="vertical" class="!h-[unset] max-sm:hidden" />
      <el-divider class="sm:!hidden" />
      <div class="flex-1">
        <h2 class="text-2xl">一些设置</h2>
        <div>
          <div class="flex items-center gap-4">
            纯享模式<el-switch v-model="onlyPlayOneSetting" />
          </div>
          <div class="flex items-center gap-4">
            音量保护设定<el-slider class="flex-1" v-model="voiceSetting" />
          </div>
          <div class="flex items-center gap-4 max-sm:hidden">
            键盘绑定模式<el-switch v-model="keyboardModeSetting" />
            <el-button
              :color="configStore.config.btn_color"
              plain
              @click="keyboardSettingVisible = true"
              >键盘设置</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <keyboard-setting v-model="keyboardSettingVisible" />
  </div>
</template>

<style lang="scss" scoped>
@use 'element-plus/theme-chalk/src/mixins/function.scss' as *;

.config-panel {
  #{getCssVarName("border", "color")}: var(--text-color-regular);
  .el-switch {
    #{getCssVarName("switch", "on-color")}: var(--primary-color);
  }
  .el-slider {
    #{getCssVarName("slider", "main-bg-color")}: var(--primary-color);
  }
}
</style>
