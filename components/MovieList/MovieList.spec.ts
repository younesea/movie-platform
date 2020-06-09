import { MountOptions, RouterLinkStub } from '@vue/test-utils'
import MovieList from './MovieList.vue'
import { mountComponent } from '@/utils/tests'

interface IMovie {
  name: string
  posterPath: string
}

interface IConfig extends MountOptions<Vue> {
  propsData: {
    movies: IMovie[]
    title: string
  }
}

const movies = [
  {
    name: 'The Blackout',
    posterPath:
      'https://image.tmdb.org/t/p/original/avl9MEQhtvokNnzoWepkmHBZ2ss.jpg',
  },
  {
    name: 'The Last Days of American Crime',
    posterPath:
      'https://image.tmdb.org/t/p/original/ygCQnDEqUEIamBpdQdDYnFfxvgM.jpg',
  },
]

describe('MovieList', () => {
  const defaultConfig: IConfig = {
    propsData: {
      movies,
      title: 'Popular',
    },
    stubs: {
      NuxtLink: RouterLinkStub,
    },
  }

  const createWrapper = mountComponent(MovieList)
  const defaultWrapper = createWrapper(defaultConfig)

  it('has a title', () => {
    expect(defaultWrapper.find('h2').exists()).toBeTruthy()
    expect(defaultWrapper.find('h2').text()).toBe('Popular')
  })

  it('shows a list of movies', () => {
    const { movies } = defaultConfig.propsData
    expect(defaultWrapper.findAll('.slide').length).toBe(movies.length)
  })
})
