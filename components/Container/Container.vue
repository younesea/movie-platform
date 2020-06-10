<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Container',
}
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 1rem;
}

@media screen and (min-width: 1200px) {
  .container {
    padding: initial;
  }
}
</style>
