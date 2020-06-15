<template>
  <Container>
    <div v-if="showLoading" class="mt-4 px-16">
      Fetching the search page...
    </div>
    <div v-else>
      <form class="flex mt-16 px-4 md:px-16 w-full" @submit="searchMovie">
        <input
          id="search"
          v-model="form.search"
          class="search-input"
          name="search"
          type="text"
        />
        <button class="search-send">Send</button>
      </form>
      <MovieList
        v-if="movies.length"
        class="mt-16"
        title="Search Results"
        :movies="movies"
      />
    </div>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import Container from '@/components/Container'
import MovieList from '@/components/MovieList'
import { IMovieList } from '@/types/TheMovieDb'
import { updateQueryParams } from '@/utils/url'

interface IMovie {
  name: string
  posterPath: string
  to: string
}

export default Vue.extend({
  name: 'Search',
  components: {
    Container,
    MovieList,
  },
  async fetch() {
    const { query } = this.$nuxt.context

    if (typeof query.search === 'string' && query.search.length) {
      // @ts-ignore-next-line
      await this.searchMovie(query?.search)
    }
  },
  data: () => ({
    form: {
      search: '',
    },
    movies: [] as IMovie[],
  }),
  computed: {
    showLoading() {
      const searchQueryIsEmpty: boolean =
        typeof window === 'undefined' ? true : !window.location.search.length

      return !searchQueryIsEmpty && this.$fetchState.pending
    },
  },
  created() {
    const { query } = this.$nuxt.context

    // Sets input field to the query param 'search' if it exists
    if (typeof query.search === 'string' && query.search.length) {
      this.form.search = query.search
    }
  },
  methods: {
    async searchMovie(search: string | Event): Promise<void> {
      const token = process.env.THE_MOVIE_DB_ACCESS_TOKEN || ''
      const baseUrl = process.env.THE_MOVIE_BASE_URL || ''
      const baseImagePath = process.env.THE_MOVIE_POSTER_BASE_PATH || ''
      let data: IMovieList | null = null
      const searchTerm = typeof search === 'string' ? search : this.form.search

      if (typeof search !== 'string') search.preventDefault()

      try {
        this.$axios.setToken(token, 'Bearer')

        // TODO: Create Typescript interface for response data
        data = await this.$axios.$get(
          `${baseUrl}/search/movie?api_key=${token}&query=${searchTerm}`
        )

        updateQueryParams(searchTerm)
      } catch (e) {
        console.error(e)
      }

      if (data) {
        // Get the properties that are needed for the UI and assign it to the local state
        this.movies = data.results.map((movie) => ({
          name: movie.title,
          posterPath: baseImagePath + movie.poster_path, // eslint-disable-line
          to: `/movie/${movie.id}`,
        }))
      }
    },
  },
})
</script>

<style scoped>
.search-input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mr-4;
}

.search-input:focus {
  @apply outline-none shadow-outline;
}

.search-send {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
}

.search-send:hover {
  @apply bg-blue-700;
}
</style>
