import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import LayoutHeader from './LayoutHeader.vue'
import { createPinia } from 'pinia'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(LayoutHeader, {
      global: {
        plugins: [createPinia()]
      }
    })
    expect(wrapper.text()).toContain('鸽一品按钮')
  })
})
