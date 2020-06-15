<template>
  <Container>
    <div v-if="$fetchState.pending" class="mt-4 px-16">
      Fetching the movie...
    </div>
    <main
      class="px-16 mt-8 mb-16"
      :class="$fetchState.pending ? 'opacity-0' : 'opacity-1'"
    >
      <div class="grid grid-rows-1 lg:grid-flow-col gap-16">
        <div>
          <h1 class="text-2xl">{{ title }}</h1>
          <div>
            {{ description }}
          </div>
          <aside>
            <ul class="meta-data">
              <li>
                Status: <span>{{ status }}</span>
              </li>
              <li>
                Genres: <span>{{ genreNames }}</span>
              </li>
              <li>
                Release Date: <span>{{ releaseDate }}</span>
              </li>
              <li>
                Adult Movie: <span>{{ adultMovie }}</span>
              </li>
              <li>
                Vote Average: <span>{{ voteAverage }}</span>
              </li>
              <li>
                Vote Count: <span>{{ voteCount }}</span>
              </li>
            </ul>
          </aside>
          <button
            class="bg-blue-500 rounded py-2 px-6 text-white font-bold mt-6"
            @click="openFullscreen"
          >
            Play Movie
          </button>
        </div>
        <div>
          <img :src="posterPath" :alt="`Poster of '${title}'`" />
          <video
            id="video"
            :class="{ 'opacity-0': !video.isFullscreen }"
            controls
          ></video>
        </div>
      </div>
    </main>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import Container from '@/components/Container'
import { Genre, IMovie } from '@/types/TheMovieDb'

let shaka: any
if (typeof window !== 'undefined') {
  shaka = require('shaka-player')
}

export default Vue.extend({
  name: 'Id',
  components: {
    Container,
  },
  async fetch() {
    const { $axios, params } = this.$nuxt.context
    let data: IMovie | null = null
    const token = process.env.THE_MOVIE_DB_ACCESS_TOKEN || ''
    const baseUrlPoster = process.env.THE_MOVIE_POSTER_BASE_PATH || ''

    try {
      $axios.setToken(token, 'Bearer')

      data = await $axios.$get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${token}`
      )
    } catch (e) {
      console.error(e)
    }

    if (data === null) return

    this.title = data.title
    this.description = data.overview
    this.genres = data.genres || []
    this.posterPath = baseUrlPoster + data.poster_path // eslint-disable-line
    this.releaseDate = data.release_date; // eslint-disable-line
    this.status = data.status || ''
    this.adultMovie = data.adult ? 'Yes' : 'No'
    this.voteAverage = data.vote_average; // eslint-disable-line
    this.voteCount = data.vote_count; // eslint-disable-line
  },
  data: () => ({
    title: '',
    description: '',
    genres: [] as Genre[],
    posterPath: '',
    releaseDate: '',
    status: '',
    adultMovie: '',
    voteAverage: 0,
    voteCount: 0,
    video: {
      isFullscreen: false,
      element: null as HTMLVideoElement | null,
    },
  }),
  computed: {
    genreNames() {
      return this.genres
        .map((genre: Genre) => {
          return genre.name
        })
        .join(', ')
    },
  },
  mounted() {
    // TODO: Refactor components to use composition api
    // @ts-ignore-next-line
    this.initShaka()
    this.video.element = document.getElementById('video') as HTMLVideoElement

    document.addEventListener('fullscreenchange', () => {
      if (window.innerHeight !== screen.height) {
        this.video.isFullscreen = false
        this.video.element?.pause()
      }
    })
  },
  methods: {
    initShaka() {
      const manifestUri =
        'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'

      async function initPlayer() {
        const video = document.getElementById('video')

        // Registers the HLS parser
        shaka.media.ManifestParser.registerParserByExtension(
          'm3u8',
          shaka.hls.HlsParser
        )
        shaka.media.ManifestParser.registerParserByMime(
          'application/x-mpegURL',
          shaka.hls.HlsParser
        )

        // Loads the video player
        const player = new shaka.Player(video)
        window.player = player
        player.addEventListener('error', onErrorEvent)

        try {
          await player.load(manifestUri)
        } catch (error) {
          onError(error)
        }
      }

      function onErrorEvent(event: CustomEvent) {
        onError(event.detail)
      }

      function onError(error: DOMException) {
        console.error('Error code', error.code, 'object', error)
      }

      shaka.polyfill.installAll()

      if (shaka.Player.isBrowserSupported()) {
        initPlayer()
      } else {
        console.error('Browser not supported!')
      }
    },
    openFullscreen() {
      this.video.element?.requestFullscreen().catch((error) => {
        console.error(error)
      })
      this.video.isFullscreen = true

      this.video.element?.play()
    },
  },
  head() {
    return {
      script: [{ src: '/scripts/mux.js' }],
    }
  },
})
</script>

<style scoped>
.meta-data {
  @apply mt-10;
}

.meta-data li {
  @apply font-normal;
}

.meta-data span {
  @apply font-semibold;
}
</style>
