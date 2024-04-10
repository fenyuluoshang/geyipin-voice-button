<script lang="ts" setup>
import { HTTPResponseData } from '~/dtos'
import { AnchorDTO } from '~/dtos/anchor'

const nuxtApp = useNuxtApp()

const domainData = useDomain()

const { data: voicesData } = await useAsyncData(async () => {
  return (
    await nuxtApp.$axios.get<HTTPResponseData<AnchorDTO>>(
      `/api/anchor/${domainData.value.anchor}/voices`
    )
  ).data.data
})
</script>

<template>
  <div>
    <voices-group
      v-for="item in voicesData?.voiceTags"
      :key="item.id"
      :name="item.title"
      :list="item.voices || []"
    />
  </div>
</template>
