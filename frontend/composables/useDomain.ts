const MAIN_NAME = 'voice-button'

function useDomain() {
  const url = useRequestURL()
  return computed(() => {
    const hostSub = url.host.split(/[.:]/)

    return {
      anchor: hostSub[0] === MAIN_NAME ? undefined : hostSub[0],
      host: url.host
    }
  })
}

export default useDomain
