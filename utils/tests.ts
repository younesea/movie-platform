import Vue, { VueConstructor } from 'vue'
import { mount, MountOptions } from '@vue/test-utils'

export const mountComponent = (component: VueConstructor<Vue>) => (
  config: MountOptions<Vue>
) => {
  return mount(component, config)
}
