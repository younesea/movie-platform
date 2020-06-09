import { mount, RouterLinkStub } from '@vue/test-utils'
import TheHeader from '@/components/TheHeader/TheHeader.vue'

describe('TheHeader', () => {
  const wrapper = mount(TheHeader, {
    stubs: {
      NuxtLink: RouterLinkStub,
    },
  })

  it('has a navbar', () => {
    expect(wrapper.findAll('nav').length).toBe(1)
  })

  it('has nav items', () => {
    expect(wrapper.findAll('li').length).toBeGreaterThan(0)
  })
})
