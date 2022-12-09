/* eslint-disable global-require */
import React from 'react'
import classNames from 'classnames'
import style from './index.module.less'

export default function Loading({
  className,
  tip
}) {
  return (
    <div
      className={classNames(style.loading, className)}
    >
      <img
        src={require('@/component/status/Loading/img/loading.gif')}
        alt="loading"
        className={style.spinner}
      />
      <div
        className={style.tip}
      >
        { tip !== undefined ? tip : '正在努力加载中…'}
      </div>
    </div>
  )
}
