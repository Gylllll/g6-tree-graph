import React from 'react'
import style from './error.module.less'

const errorImg = '@/component/status/Error/img/error.png'

export default function Error({
  title,
  desc,
  error
}) {
  let displayTitle = title
  // 此类错误 toast已经拦截
  if (error && error.isAxiosError) {
    if (!title) {
      displayTitle = '很抱歉，网络开小差了，请重试'
    }
  }
  console.error(error && error.stack)
  return (
    <div className={style['error-wrap']}>
      <img src={errorImg} alt="" />
      <h2>
        {displayTitle || '加载组件时发生了一些异常'}
      </h2>
      { desc ? <span>{desc}</span> : null }
    </div>
  )
}
