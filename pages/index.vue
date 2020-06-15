<template>
  <Container>
    <div v-if="$fetchState.pending" class="mt-4 px-16">Fetching movies...</div>
    <main v-else>
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
    </main>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import MovieList from '@/components/MovieList'
import Container from '@/components/Container'
import { IMovieList } from '@/types/TheMovieDb'

export default Vue.extend({
  components: {
    Container,
    MovieList,
  },
  async fetch() {
    const { $axios } = this.$nuxt.context
    const results: Promise<IMovieList>[] = []
    const token = process.env.THE_MOVIE_DB_ACCESS_TOKEN || ''
    const baseUrl = process.env.THE_MOVIE_BASE_URL || ''
    const baseImagePath = process.env.THE_MOVIE_POSTER_BASE_PATH || ''
    let response: IMovieList[] = []

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
      console.error(error)
    }

    const titles: string[] = ['Popular', 'Top Rated', 'Upcoming']

    // Gets the properties needed for the UI from the response
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
