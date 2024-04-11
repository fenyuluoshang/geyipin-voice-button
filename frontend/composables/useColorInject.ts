function useColorInject() {
  const anchorConfigStore = useAnchorConfigStore()

  const configStore = useConfigStore()
  
  useHead({
    style: computed(() => [
      {
        innerHTML: `:root{ 
          --primary-color: ${anchorConfigStore.config?.primaryColor || configStore.config.primary_color};
          --second-color: ${anchorConfigStore.config?.secondColor || configStore.config.second_color};
        }`
      },
      {
        innerHTML: `.dark{ 
          --primary-color: ${anchorConfigStore.config?.primaryColorDark || configStore.config.primary_color_dark};
          --second-color: ${anchorConfigStore.config?.secondColorDark || configStore.config.second_color_dark};
        }`
      }
    ])
  })
}

export default useColorInject