function forbidUserScalabel() {
  const metaEl = document.querySelector('meta[name="viewport"]')
  let content = metaEl.getAttribute('content') || ''
  content = content.split(',')
  content.push('user-scalable=0')
  metaEl.setAttribute('content', content.join(','))

  // ios10以上系统
  // 注意：禁用双指缩放后，scroll事件需要重新绑定，滚动条的事件监听touchmove，touchstart,touchend;
  document.addEventListener('gesturestart', (event) => { event.preventDefault() })
}

forbidUserScalabel()
