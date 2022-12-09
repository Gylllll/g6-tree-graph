const backgroundReg = /^background(-image)?$/
const wrapperClass = 'webp'
const imageReg = /\.(gif|png|jpe?g)/
const staticImageReg = /(\.png|\.jpe?g)/
const nodeModulesReg = /node_modules/

module.exports = () => ({
  postcssPlugin: 'webp',
  Rule(rule, { Rule }) {
    if (nodeModulesReg.test(rule?.source?.input?.file)) {
      return
    }
    if (rule.selector.indexOf(`.${wrapperClass}`) !== -1) {
      return
    }
    const backgroundImage = rule.nodes.filter((el) => el.type === 'decl' && el.prop.match(backgroundReg))
    if (backgroundImage && backgroundImage.length) {
      rule.walkDecls(backgroundReg, (decl) => {
        const hasUrl = decl.value.match(/url\((.*)?\)/)
        if (hasUrl) {
          const imageUrl = hasUrl[1].replace(/'|"/gi, '')
          if (imageUrl.indexOf('.webp') !== -1 || imageUrl.startsWith('data:image')) {
            return
          }
          const webpImageUrl = imageUrl.replace(imageReg, '.webp')
          const webpRule = new Rule({
            selector: `:global(.${wrapperClass}) ${rule.selector}`
          })
          webpRule.append({
            prop: 'background-image',
            value: `url(${webpImageUrl})`,
            important: decl.important
          })
          rule.after(webpRule)
          decl.value = decl.value.replace(staticImageReg, '-m$1')
        }
      })
    }
  }
})

module.exports.postcss = true
