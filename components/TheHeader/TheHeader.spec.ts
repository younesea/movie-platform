import TheHeader from '~/components/TheHeader/TheHeader.vue'
import { mount, RouterLinkStub } from '@vue/test-utils'

describe('TheHeader', () => {
  const wrapper = mount(TheHeader, {
    stubs: {
      NuxtLink: RouterLinkStub
    }
  })

  it('has a navbar', () => {
    expect(wrapper.find('nav')).toBeDefined()
  })

  it('has nav items', () => {
    expect(wrapper.findAll('li').length).toBeGreaterThan(0)
  })
})
