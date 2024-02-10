<script setup lang="ts">
definePageMeta({
  layout: 'no-footer'
})

const scale = ref(1)
const count = ref(-1)

const addAnimationList = ref<
  Array<{
    id: number
    size: number
  }>
>([])

function showAdd(num: number) {
  const add = num - count.value
  if (add <= 0 || count.value === -1) {
    return
  }
  const id = Date.now()
  addAnimationList.value.push({ id, size: add })
  setTimeout(() => {
    addAnimationList.value.splice(
      addAnimationList.value.findIndex((val) => val.id === id),
      1
    )
  }, 1450)
}

const nuxtApp = useNuxtApp()

const route = useRoute()

const isLive = computed(() => route.query.type !== '1')

async function loadCaptainNum() {
  const data = await nuxtApp.$axios.get(
    isLive.value ? '/api/anchor/1/captain/live' : '/api/anchor/1/captain'
  )
  const sums = data.data.data.sums
  showAdd(sums)
  count.value = sums
}

const interval = ref<ReturnType<typeof setInterval>>()

function setScale() {
  const width = window.screen.width
  scale.value = width / 2560
}

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
  <div class="scale-box" :style="{ transform: `scale(${scale})` }">
    <div v-if="count !== -1" class="number-text numbox z-2">{{ count }}/1000</div>
    <div class="z-3">
      <div v-for="item in addAnimationList" :key="item.id" class="number-text add-box">
        +{{ item.size }}
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
  width: 1242px;
  height: 800px;

  .number-text {
    font-size: 255px;
    line-height: 393px;
    font-weight: 1000;
    text-align: center;
    color: transparent;
    background-image: linear-gradient(79deg, #ffe176, #dbb735);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 7px #fff;
  }

  .numbox {
    position: absolute;
    top: 300px;
    left: 0;

    width: 1242px;
    height: 393px;
  }

  .add-box {
    position: absolute;
    top: 300px;
    left: 800px;
    height: 393px;
    animation: add 1.5s ease-in-out;
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
