const path = require('path')

module.exports = {
  addons: [
    '@storybook/addon-viewport/register',
    '@storybook/preset-typescript'
  ],
  webpackFinal: config => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../')

    return config
  },
  stories: ['../components/**/*.stories.[tj]s']
}
