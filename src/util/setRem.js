// 设计稿宽度
const DESIGN_WIDTH = 750

// 移动设备最大宽度
const MAX_WIDTH = 640

export default function setRem(designWidth = DESIGN_WIDTH, maxWidth = MAX_WIDTH) {
// todo 加入dpr处理
  const docEl = document.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
    const { clientWidth } = docEl
    if (!clientWidth) return
    if (clientWidth >= maxWidth) {
      docEl.style.fontSize = '100px'
    } else {
      docEl.style.fontSize = `${100 * (clientWidth / designWidth)}px`
    }
  }

  if (document.addEventListener) {
    window.addEventListener(resizeEvt, recalc, false)
    document.addEventListener('DOMContentLoaded', recalc, false)
  }
}

setRem()
