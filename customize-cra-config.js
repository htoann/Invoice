import CracoLessPlugin from 'craco-less';
import path from 'path';
import { theme } from './src/utils/theme/themeVariables';

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
        test: /\.(js|jsx)$/,
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
