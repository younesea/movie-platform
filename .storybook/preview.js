import 'tailwindcss/dist/tailwind.css';
import { addDecorator } from '@storybook/vue'

const decoratorVueTemplate = () => ({
  template: `
    <div class="flex w-full justify-center pt-2">
      <story/>
    </div>`
})

addDecorator(decoratorVueTemplate)
