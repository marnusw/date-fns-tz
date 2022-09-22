const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: __dirname,
  entry: {
    'smoketest.cjs': './smoketest.cjs',
    'smoketest.mjs': './smoketest.mjs',
  },
  output: {
    path: path.resolve(__dirname, 'webpack'),
  },
  plugins: [
    new HtmlWebpackPlugin({ chunks: ['smoketest.cjs'], filename: 'smoketest.cjs.html' }),
    new HtmlWebpackPlugin({ chunks: ['smoketest.mjs'], filename: 'smoketest.mjs.html' }),
  ],
}
