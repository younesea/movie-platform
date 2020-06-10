<template>
  <header class="w-full border-b-2 py-5">
    <Container>
      <nav class="px-16">
        <ul class="list-none flex justify-between w-full">
          <li
            v-for="item in items"
            :key="item.text"
            class="transition ease-in duration-100 text-black hover:text-green-600"
          >
            <NuxtLink :to="item.link" v-text="item.text" />
          </li>
        </ul>
      </nav>
    </Container>
  </header>
</template>

<script>
import Container from '@/components/Container'

export default {
  name: 'TheHeader',
  components: {
    Container,
  },
  data() {
    const items = [
      { text: 'Home', link: '/' },
      { text: 'Search', link: '/search' },
    ]

    return {
      items,
    }
  },
}
</script>

<style scoped></style>
