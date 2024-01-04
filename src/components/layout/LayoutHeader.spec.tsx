import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import LayoutHeader from './LayoutHeader.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useSearchStore } from '@/stores/search'
import { ElInput } from 'element-plus'
import config from '@/voice-mapping.json'
import { CONFIG_KEY } from '@/types/provide_keys'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const store = createPinia()
    setActivePinia(store)
    const wrapper = mount(LayoutHeader, {
      global: {
        plugins: [store],
        provide: {
          [CONFIG_KEY as symbol]: config
        }
      }
    })
    expect(wrapper.text()).toContain('天才鸽按钮')

    const searchInput = wrapper.findComponent(ElInput)
    expect(searchInput.exists()).toBe(true)

    searchInput.vm.$emit('update:modelValue', 'test')

    const searchStore = useSearchStore()

    expect(searchStore.search).toEqual('test')

    if (config.bili_link) {
      const biliLink = wrapper.find('[data-test-id="bili_link"]')
      expect(biliLink.exists()).toBe(true)

      expect(biliLink.attributes('href')).toBe(config['bili_link'])
    } else {
      const biliLink = wrapper.find('[data-test-id="bili_link"]')
      expect(biliLink.exists()).toBe(false)
    }
  })
})
