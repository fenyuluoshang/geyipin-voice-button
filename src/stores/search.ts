import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const search = ref('')
  function increment(keywords: string) {
    search.value = keywords
  }

  return { search, increment }
})
