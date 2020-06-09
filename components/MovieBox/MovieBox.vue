<template>
  <div>
    <NuxtLink to="/">
      <div class="w-full text-center border border-gray-500 rounded overflow-hidden">
        <img :src="src" :alt="name" :loading="loading" />
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { LoadingAttr } from "@/enums";

export default Vue.extend({
  name: 'MovieBox',
  props: {
    name: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    loading: {
      type: String,
      default: 'auto',
      validator: (value: LoadingAttr) => Object.values(LoadingAttr).indexOf(value) !== -1
    }
  }
})
</script>

<style scoped></style>
