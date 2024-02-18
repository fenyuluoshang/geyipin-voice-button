import { AdminAnchorWithRoleDTO } from '~/dtos/admin'

export const AnchorRoles = [
  '/voice/update',
  '/voice/check',
  '/voice/tags',
  '/emotion/update',
  '/emotion/check',
  '/emotion/tags'
] as const

export const useAdminAnchorDataStore = defineStore('adminAnchorData', () => {
  const nuxtApp = useNuxtApp()

  const loading = ref(false)

  const adminAnchorData = ref<AdminAnchorWithRoleDTO[]>()

  async function load() {
    loading.value = true
    try {
      const result = await nuxtApp.$axios.get('/api/admin/anchor')
      if (result.data.code === 1) {
        adminAnchorData.value = result.data.data
        return adminAnchorData.value
      }
      return undefined
    } finally {
      loading.value = false
    }
  }

  const anchorDataMap = computed(() => {
    const map: Record<(typeof AnchorRoles)[number], AdminAnchorWithRoleDTO[]> = {} as any
    for (const role of AnchorRoles) {
      // @ts-ignore
      map[role] = adminAnchorData.value?.filter((item) => item.role[role]) || []
    }

    return map
  })

  return {
    load,
    data: adminAnchorData,
    map: anchorDataMap
  }
})
