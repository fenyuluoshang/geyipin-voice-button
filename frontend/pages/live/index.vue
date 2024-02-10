<script setup lang="ts">
import { egg1List as egg1ListData } from '@/util/live/egg'

definePageMeta({
  layout: 'no-footer'
})

const egg1List = ref([...egg1ListData])
const scale = ref(1)
const count = ref(-1)
const showEggData = ref<(typeof egg1ListData)[0]>()

const addAnimationList = ref<
  Array<{
    id: number
    size: number
  }>
>([])

function setScale() {
  const width = window.screen.width
  scale.value = width / 2560
}

function showAdd(num: number) {
  const add = num - count.value
  if (count.value === -1) {
    let index = 0
    for (; index <= egg1List.value.length; index++) {
      if (egg1List.value[index].count > num) {
        break
      }
    }
    egg1List.value.splice(0, index)
    return
  }
  if (add <= 0) {
    return
  }
  showEgg(num)
  const id = Date.now()
  addAnimationList.value.push({ id, size: add })
  setTimeout(() => {
    addAnimationList.value.splice(
      addAnimationList.value.findIndex((val) => val.id === id),
      1
    )
  }, 1450)
}

function showEgg(num: number) {
  if (egg1List.value.length > 0 && num >= egg1List.value[0].count) {
    const data = egg1List.value.shift()
    showEggData.value = data
    setTimeout(() => {
      showEggData.value = undefined
    }, 5000)
  }
}

const nuxtApp = useNuxtApp()

const isLive = computed(() => true)

async function loadCaptainNum() {
  const data = await nuxtApp.$axios.get(
    isLive.value ? '/api/anchor/1/captain/live' : '/api/anchor/1/captain'
  )
  const sums = data.data.data.sums
  showAdd(sums)
  count.value = sums
}

const interval = ref<ReturnType<typeof setInterval>>()

onMounted(() => {
  setScale()
  window.addEventListener('resize', setScale)
  loadCaptainNum()
  interval.value = setInterval(() => loadCaptainNum(), isLive.value ? 3000 : 60000)
})

onUnmounted(() => {
  window.removeEventListener('resize', setScale)
  clearInterval(interval.value)
  interval.value = undefined
})
</script>
<template>
  <div class="w-full h-[100vh]">
    <div class="scale-box" :style="{ transform: `scale(${scale})` }">
      <div v-if="count !== -1" class="number-text numbox z-2">{{ count }}/1000</div>
      <div class="z-3">
        <div v-for="item in addAnimationList" :key="item.id" class="number-text add-box">
          +{{ item.size }}
        </div>
      </div>
      <img
        class="bg"
        src="https://fenyu-media.oss-cn-beijing.aliyuncs.com/tiancaige/2024-02/bg.png"
      />
      <div v-if="showEggData" class="egg">
        <div class="egg-box">
          <component :is="showEggData.jsx" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scale-box {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  overflow: hidden;
  width: 2560px;
  height: 3760px;

  .number-text {
    font-size: 255px;
    line-height: 393px;
    font-weight: 1000;
    text-align: center;
    color: transparent;
    background-image: linear-gradient(79deg, #ffe176, #dbb735);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 7px #fff;
  }

  .numbox {
    position: absolute;
    top: 485px;
    left: 1225px;

    width: 1242px;
    height: 393px;
  }

  .add-box {
    position: absolute;
    top: 485px;
    left: 2050px;
    height: 393px;
    animation: add 1.5s ease-in-out;
  }

  .egg {
    position: absolute;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    flex-direction: column;
    align-items: center;
  }
  .egg-box {
    padding: 0 10%;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  :deep(.egg-text) {
    @extend .number-text;
    font-size: 160px;
    line-height: 300px;
  }
}

@keyframes add {
  0% {
    transform: translateY(0%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-120%);
    opacity: 0;
  }
}
</style>
