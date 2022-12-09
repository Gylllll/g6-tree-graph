import React from 'react'
import EmptyImg from '@/component/Empty/img/empty.png'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'
import style from './index.module.less'

function Empty({
  tip = '数据准备中',
  description,
  wrapCls = ''
}) {
  const {
    pathname
  } = useLocation()

  const isBigScreen = pathname.indexOf('bigScreen')

  return (
    <div className={classNames(style.empty, isBigScreen && style['web-empty'], wrapCls)}>
      <img src={EmptyImg} />
      <div className={style.text}>{tip}</div>
      {description}
    </div>
  )
}

export default Empty
