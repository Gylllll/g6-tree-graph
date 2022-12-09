/* eslint-disable global-require */
import React from 'react'
import classNames from 'classnames'
import useGoToPage from '@/hook/useGoToPage'
import { useLocation } from 'react-router-dom'
import style from './index.module.less'

const Error404 = ({ className }) => {
  const goToPage = useGoToPage()

  const {
    pathname
  } = useLocation()

  const isBigScreen = pathname.indexOf('bigScreen')

  return (
    <div className={classNames(
      style.error,
      isBigScreen && style['web-error'],
      className
    )}
    >
      <img src={require('@/component/status/404/img/404.png')} />
      <div className={style.text}>服务器开小差了，请稍后再试试</div>
      <div className={style.back} onClick={() => goToPage('/')}>返回首页</div>
    </div>
  )
}

export default Error404
