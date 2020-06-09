import { mount, RouterLinkStub } from '@vue/test-utils'
import MovieBox from '@/components/MovieBox'
import { LoadingAttr } from "@/enums";

interface IPropsData {
  name: string;
  src: string;
  loading: string;
}

describe('MovieBox', () => {
  const defaultPropsData = {
    name: 'The Blackout',
    src: 'https://image.tmdb.org/t/p/original/avl9MEQhtvokNnzoWepkmHBZ2ss.jpg',
    loading: LoadingAttr.Lazy
  }

  const createWrapper = (propsData: IPropsData = defaultPropsData) => mount(MovieBox, {
    propsData,
    stubs: {
      NuxtLink: RouterLinkStub
    }
  })

  const defaultWrapper = createWrapper()

  it('has an image', () => {
    expect(defaultWrapper.findAll('img').length).toBe(1)
    expect(defaultWrapper.find('img').attributes('src')).toBe(defaultPropsData.src)
    expect(defaultWrapper.find('img').attributes('alt')).toBe(defaultPropsData.name)
    expect(defaultWrapper.find('img').attributes('loading')).toBe(defaultPropsData.loading)
  })

  it('sets the loading attribute on auto when not specified', () => {
    const propsData = {...defaultPropsData}
    delete propsData.loading
    const wrapper = createWrapper(propsData)

    expect(wrapper.find('img').attributes('loading')).toBe(LoadingAttr.Auto)
  })

  it('has a link', () => {
    expect(
      defaultWrapper.findComponent({ name: 'RouterLinkStub' }).exists()
    ).toBeTruthy()
  })
})
