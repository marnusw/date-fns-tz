const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'

const config = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  entry: getEntryConfig(),
  output: getOutputConfig(),
  module: {
    rules: [
      {
        test: /\.m?(ts|js)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.m?js$/,
        include: /src(\/.*)?\/test\.js$/,
        type: 'javascript/esm',
      },
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
    extensions: ['.ts', '...'],
    extensionAlias: {
      '.js': ['.ts', '.js'],
    },
    fallback: {
      // NodeJS polyfills mainly for karma
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      util: require.resolve('util'),
    },
  },
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
