// eslint-disable-next-line import/no-import-module-exports
import { theme } from './src/config/theme/themeVariables';

const CracoLessPlugin = require('craco-less');
const path = require('path');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          path: false,
          stream: false,
        },
      },
    },
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              ...theme,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
};
