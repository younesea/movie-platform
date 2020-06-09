import MovieList from './MovieList.vue'

export default {
  title: 'MovieList',
}

const baseImagePath = process.env.THE_MOVIE_POSTER_BASE_PATH
const movies = [
  {
    name: 'The Blackout',
    posterPath: `${baseImagePath}/avl9MEQhtvokNnzoWepkmHBZ2ss.jpg`,
    to: '/',
  },
  {
    name: 'The Last Days of American Crime',
    posterPath: `${baseImagePath}/ygCQnDEqUEIamBpdQdDYnFfxvgM.jpg`,

    to: '/',
  },
  {
    name: 'Parasite',
    posterPath: `${baseImagePath}/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg`,
    to: '/',
  },
  {
    name: 'Spider-Man: Far from Home',
    posterPath: `${baseImagePath}/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg`,
    to: '/',
  },
  {
    name: 'The Pale Door',
    posterPath: `${baseImagePath}/shx7pGYQ9s4t7WFe19eES2WOrMS.jpg`,
    to: '/',
  },
  {
    name: 'Bloodshot',
    posterPath: `${baseImagePath}/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg`,
    to: '/',
  },
  {
    name:
      'Birds of Prey (and the Fantabulous Emancipation of One Harley Quinn)',
    posterPath: `${baseImagePath}/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg`,
    to: '/',
  },
  {
    name: 'Becky',
    posterPath: `${baseImagePath}/xqbQtMffXwa3oprse4jiHBMBvdW.jpg`,
    to: '/',
  },
  {
    name: 'Wolves at the Door',
    posterPath: `${baseImagePath}/kizBwSEfvJFEOuYfwbOGtWZit3v.jpg`,
    to: '/',
  },
  {
    name: 'Sonic the Hedgehog',
    posterPath: `${baseImagePath}/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg`,
    to: '/',
  },
]

export const Default = () => ({
  components: { MovieList },
  data: () => ({
    movies,
  }),
  template: `
    <div class="w-full px-12 lg:px-40 py-8 h-full">
        <MovieList title="Popular" :movies="movies" />
    </div>
  `,
})
