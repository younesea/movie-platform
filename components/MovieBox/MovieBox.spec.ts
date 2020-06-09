import { MountOptions, RouterLinkStub } from '@vue/test-utils'
import Vue from 'vue'
import MovieBox from '@/components/MovieBox'
import { LoadingAttr } from '@/enums'
import { mountComponent } from '@/utils/tests'

interface IConfig extends MountOptions<Vue> {
  propsData: {
    name: string
    src: string
    loading: string
  }
}

describe('MovieBox', () => {
  const defaultConfig: IConfig = {
    propsData: {
      name: 'The Blackout',
      src:
        'https://image.tmdb.org/t/p/original/avl9MEQhtvokNnzoWepkmHBZ2ss.jpg',
      loading: LoadingAttr.Lazy,
    },
    stubs: {
      NuxtLink: RouterLinkStub,
    },
  }
  const createWrapper = mountComponent(MovieBox)
  const defaultWrapper = createWrapper(defaultConfig)

  it('has an image', () => {
    const { propsData } = defaultConfig

    expect(defaultWrapper.findAll('img').length).toBe(1)
    expect(defaultWrapper.find('img').attributes('src')).toBe(propsData.src)
    expect(defaultWrapper.find('img').attributes('alt')).toBe(propsData.name)
    expect(defaultWrapper.find('img').attributes('loading')).toBe(
      propsData.loading
    )
  })

  it('sets the loading attribute on auto when not specified', () => {
    const propsData = { ...defaultConfig.propsData }
    delete propsData.loading
    const wrapper = createWrapper({ ...defaultConfig, ...{ propsData } })

    expect(wrapper.find('img').attributes('loading')).toBe(LoadingAttr.Auto)
  })

  it('has a link', () => {
    expect(
      defaultWrapper.findComponent({ name: 'RouterLinkStub' }).exists()
    ).toBeTruthy()
  })
})
