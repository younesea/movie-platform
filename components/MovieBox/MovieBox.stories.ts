import MovieBox from './MovieBox.vue'

export default {
  title: 'MovieBox'
}

export const Default = () => ({
  components: { MovieBox },
  template: `
    <div class="flex w-56 h-64">
        <movie-box src="https://image.tmdb.org/t/p/original/avl9MEQhtvokNnzoWepkmHBZ2ss.jpg" name="The Blackout"></movie-box>
    </div>
  `
})
