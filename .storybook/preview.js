import Vue from 'vue'
import 'tailwindcss/dist/tailwind.css'
import { addDecorator } from '@storybook/vue'

Vue.component('NuxtLink', {
  props: ['to'],
  template: '<div><slot>NuxtLink</slot></div>'
})

const decoratorVueTemplate = () => ({
  template: `
    <div class="flex w-full justify-center pt-2">
      <story/>
    </div>`
})

addDecorator(decoratorVueTemplate)
