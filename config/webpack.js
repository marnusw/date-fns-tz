const path = require('path')
const { DefinePlugin } = require('webpack')

const isProduction = process.env.NODE_ENV === 'production'

const config = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  entry: getEntryConfig(),
  output: getOutputConfig(),
  module: {
    rules: [
      {
        test: /\.m?ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.m?js$/,
        // include: /node_modules/,
        type: 'javascript/auto',
      },
      // {
      //   test: /\.m?js$/,
      //   include: /test\.js$/,
      //   type: 'javascript/esm',
      // }
    ].concat(
      process.env.COVERAGE_REPORT
        ? [
            {
              test: /\.js$/,
              use: {
                loader: 'istanbul-instrumenter-loader',
                options: { esModules: true },
              },
              enforce: 'post',
              exclude: /node_modules|test.js|src\/locale$/,
            },
          ]
        : []
    ),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      util: require.resolve('util'),
    },
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_DEBUG': JSON.stringify(process.env.NODE_DEBUG),
    }),
  ],
}

module.exports = config

function getEntryConfig() {
  if (process.env.BUILD_TESTS) {
    return {
      tests: './testWithoutLocales.js',
    }
  } else if (process.env.NODE_ENV === 'test') {
    return undefined
  } else {
    return {
      date_fns: './tmp/umd/index.js',
    }
  }
}

function getOutputConfig() {
  if (process.env.BUILD_TESTS) {
    return {
      path: path.join(process.cwd(), 'tmp'),
      filename: '[name].js',
    }
  } else if (process.env.NODE_ENV === 'test') {
    return undefined
  } else {
    return {
      path: path.join(process.cwd(), 'dist'),
      filename: '[name].js',
      library: 'dateFns',
      libraryTarget: 'umd',
    }
  }
}
