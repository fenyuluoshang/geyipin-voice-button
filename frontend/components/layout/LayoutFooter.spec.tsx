import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import LayoutFooter from './LayoutFooter.vue'

describe('components/layout/LayoutFooter.vue', () => {
  it('render', ()=>{
    const wrapper = mount(LayoutFooter)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
