<script setup lang="ts">
definePageMeta({
  layout: 'no-footer'
})

const egg1List = [200, 250, 300, 400, 500, 600, 700, 800, 900, 1000]
const scale = ref(1)
const count = ref(0)
const showEggNum = ref(0)

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
  if (egg1List.includes(num)) {
    showEggNum.value = num
    setTimeout(() => {
      showEggNum.value = 0
    }, 5000)
  }
}

const nuxtApp = useNuxtApp()

async function loadCaptainNum() {
  const data = await nuxtApp.$axios.get('/api/anchor/1/captain')
  const sums = data.data.data.sums
  showAdd(sums)
  count.value = sums
}

onMounted(() => {
  setScale()
  window.addEventListener('resize', setScale)
  loadCaptainNum()
  setInterval(() => loadCaptainNum(), 3000)
})

onUnmounted(() => {
  window.removeEventListener('resize', setScale)
})
</script>
<template>
  <div class="w-full h-[100vh]">
    <div class="scale-box" :style="{ transform: `scale(${scale})` }">
      <div class="number-text numbox z-2">{{ count }}/1000</div>
      <div class="z-3">
        <div v-for="item in addAnimationList" :key="item.id" class="number-text add-box">
          +{{ item.size }}
        </div>
      </div>
      <img
        class="bg"
        src="https://fenyu-media.oss-cn-beijing.aliyuncs.com/tiancaige/2024-02/bg.png"
      />
      <div v-if="showEggNum" class="egg">
        <div class="egg-box">
          <img
            class="w-[30%]"
            src="https://fenyu-media.oss-cn-beijing.aliyuncs.com/tiancaige/2024-02/qwq.jpg"
          />
          <p class="egg-text">
            恭喜鸽一品到达<span class="now">{{ showEggNum }}</span
            >舰长
          </p>
          <p class="egg-text self-end">--by 纷羽</p>
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
}

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

.egg-text {
  @extend .number-text;
  font-size: 160px;
}
</style>
