const config = {
  presets: [
    '@gem-mine/app'
  ],
  plugins: [
  ]
}

if (!process.env.USE_JEST) {
  config.plugins.push(['import', {
    libraryName: 'fish-h5',
    libraryDirectory: 'es',
    style: true
  }])
  config.plugins.push(['import', {
    libraryName: 'fish',
    libraryDirectory: 'es',
    style: true
  }, 'fish'])
  config.plugins.push(['import', {
    libraryName: 'ahooks',
    libraryDirectory: 'es',
    camel2DashComponentName: false,
    style: false
  }, 'ahook'])
}

module.exports = config
