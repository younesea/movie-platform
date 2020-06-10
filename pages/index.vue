<template>
  <Container>
    <div v-if="$fetchState.pending">Fetching movies/shows...</div>
    <div v-else>
      <div v-if="error.length" class="mt-4 text-5xl text-center text-red-600">
        {{ error }}
      </div>
      <MovieList
        v-for="{ title, movies } in lists"
        v-else
        :key="title"
        class="mt-2 md:mt-4"
        :title="title"
        :movies="movies"
      />
    </div>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import MovieList from '@/components/MovieList'
import Container from '@/components/Container'

// TODO: Refactor to more specific interface
interface MovieListResponse {
  results: { [key: string]: any }[]
}

export default Vue.extend({
  components: {
    Container,
    MovieList,
  },
  async fetch() {
    const { $axios } = this.$nuxt.context
    const results: Promise<MovieListResponse>[] = []
    const token = process.env.THE_MOVIE_DB_ACCESS_TOKEN || ''
    const baseUrl = process.env.THE_MOVIE_BASE_URL || ''
    const baseImagePath = process.env.THE_MOVIE_POSTER_BASE_PATH || ''
    let response: MovieListResponse[] = []

    $axios.setToken(token, 'Bearer')

    try {
      const endpoints = [
        '/movie/popular',
        '/movie/top_rated',
        '/movie/upcoming',
      ]
      endpoints.forEach((endpoint) => {
        results.push($axios.$get(`${baseUrl + endpoint}?api_key=${token}`))
      })

      response = await Promise.all(results)
      this.error = ''
    } catch (error) {
      this.error = 'Something went wrong...'
      console.error(error) // eslint-disable-line
    }

    const titles: string[] = ['Popular', 'Top Rated', 'Upcoming']

    this.lists = response.reduce(
      (previousValue, currentValue, currentIndex) => {
        const result: any = [...previousValue]

        const movies = currentValue.results.map((movie) => ({
          name: movie.title,
          posterPath: baseImagePath + movie.poster_path, // eslint-disable-line
          to: `/movie/${movie.id}`,
        }))

        result.push({
          title: titles[currentIndex],
          movies,
        })

        return result
      },
      []
    )
  },
  data: () => ({
    error: '',
    lists: [],
  }),
})
</script>

<style></style>
