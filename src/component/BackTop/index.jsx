import React, { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import { useLocation } from 'react-router-dom'

import style from './index.module.less'

// 不显示 返回顶部 的页面
const noShow = []

let rootDom = null // 将 #root 作为滚动容器

let topValue = 0 // 到顶部的距离

// 返回顶部
export default function BackTop() {
  const {
    pathname
  } = useLocation()

  if (noShow.includes(pathname)) {
    return <></>
  }

  const [visible, setVisible] = useState(false)

  const scrollToTop = () => {
    if (rootDom) {
      rootDom.scrollTop = 0
    }
  }

  // 返回顶部
  const handleBackTop = () => {
    scrollToTop()
  }

  const handleScroll = debounce((e) => {
    const _target = e.target

    topValue = _target.scrollTop || 0

    if (topValue <= 0) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }, 150)

  useEffect(() => {
    // 路由变化时强制跳到顶部
    scrollToTop()
  }, [pathname])

  useEffect(() => {
    rootDom = document.getElementById('root')
    // 监听滚动（捕获最内层的滚动元素）
    rootDom.addEventListener('scroll', handleScroll)
    return () => {
      rootDom.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`${style['back-top']} ${visible ? '' : style.hidden}`}
      onClick={handleBackTop}
    />
  )
}
