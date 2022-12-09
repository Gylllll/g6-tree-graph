/**
  * 相关参数文档请参考
  * https://doc.gem-mine.tech/#/zh-cn/toolkit/api/gms
  */
const { defineConfig } = require('@gem-mine/script')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const isDev = process.argv[2] === 'dev'
const devServer = {
  https: true,
  proxy: {}
}
const { SDP_ENV } = process.env

module.exports = defineConfig({
  inlineLimit: 0,
  /**
   * dev模式下注入右下角的开发菜单
   */
  showDevEntry: false,
  transpileDependencies: ['mutex-lock'],
  chainWebpack(config) {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    // use webpack-chain
    config
      .plugin('define')
      .tap((args) => {
        let sdpEnv
        if (process.env.BUILD_ON_SDP) {
          sdpEnv = 'window.__global_env'
        } else {
          sdpEnv = JSON.stringify(SDP_ENV)
          args[0]['process.env'].BUILD_ON_LOCAL = true
        }
        args[0]['process.env'].SDP_ENV = sdpEnv
        if (isDev) {
          args[0]['process.env'].DEV = true
        }

        return args
      })
  },
  configureWebpack: {
    // normal webpack config
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: ['zh-cn']
      })
    ]
  },
  devServer,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          globalVars: {
            SeduEnv: 'ncet-xedu'
          }
        }
      }
    }
  }
})
