const presets = ['@babel/preset-env']
const plugins = [
  '@babel/plugin-transform-block-scoping',
  '@babel/plugin-transform-template-literals',
  '@babel/plugin-transform-arrow-functions',
  '@babel/plugin-transform-parameters',
  '@babel/plugin-transform-destructuring',
  '@babel/plugin-transform-optional-chaining',
  '@babel/plugin-transform-logical-assignment-operators',
]

if (process.env.NODE_ENV === 'test') {
  presets.push('babel-preset-power-assert')
}

if (process.env.TARGET !== 'esm') {
  plugins.push('@babel/plugin-transform-modules-commonjs')
  plugins.push('babel-plugin-add-module-exports')
}

module.exports = {
  presets,
  plugins,
}
