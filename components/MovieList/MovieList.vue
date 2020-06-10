<template>
  <section class="block w-full h-full">
    <h2 class="text-3xl mb-5 px-16">{{ title }}</h2>
    <div class="slider px-16">
      <VueperSlides
        class="vueper no-shadow w-full"
        :breakpoints="slider.breakpoints"
        v-bind="slider.defaultConfig"
      >
        <VueperSlide v-for="movie in movies" :key="movie.name" class="slide">
          <template v-slot:content>
            <MovieBox
              :name="movie.name"
              :src="movie.posterPath"
              :to="movie.to"
            />
          </template>
        </VueperSlide>
      </VueperSlides>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import MovieBox from '@/components/MovieBox/MovieBox.vue'

export interface IMovie {
  name: string
  posterPath: string
}

export default Vue.extend({
  name: 'MovieList',
  components: {
    MovieBox,
    VueperSlides,
    VueperSlide,
  },
  props: {
    movies: {
      type: Array,
      required: true,
    } as PropOptions<IMovie[]>,
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    const defaultConfig = {
      slideRatio: 1 / 4,
      arrows: true,
      bullets: false,
      draggingDistance: 1,
      gap: 5,
      visibleSlides: 5,
    }

    return {
      slider: {
        breakpoints: {
          900: {
            ...defaultConfig,
            visibleSlides: 4,
          },
          600: {
            ...defaultConfig,
            visibleSlides: 3,
          },
          500: {
            ...defaultConfig,
            visibleSlides: 2,
          },
        },
        defaultConfig,
      },
    }
  },
})
</script>

<style scoped>
.slider {
  height: 13rem;
}

.vueper >>> .vueperslides__parallax-wrapper {
  padding-bottom: initial !important;
}

.vueper,
.vueper >>> .vueperslides__parallax-wrapper,
.vueper >>> .vueperslides__inner {
  height: 100%;
}

@media screen and (min-width: 1100px) {
  .slider {
    height: 17rem;
  }
}
</style>
