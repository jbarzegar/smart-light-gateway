const path = require('path')
const override = require('../webpackOverride')

const toPath = p => path.join(__dirname, '../../../', p)

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-addon-performance/register',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async config => {
    const c = {
      ...config,
      resolve: {
        ...config.resolve,
        modules: [...config.resolve.modules, toPath('src')],
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
        },
      },
    }
    return override(c)
  },
}
