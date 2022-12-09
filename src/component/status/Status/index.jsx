import React from 'react'
import { Spin } from 'fish-h5'
import Empty from '@/component/Empty'
import classNames from 'classnames'

import style from './index.module.less'

export default function Status({
  className,
  tip = '加载中...',
  loading, // 显示 Loading 的条件
  empty, // 显示 Empty 的条件
  emptyProps,
  children,
  delay = 0
}) {
  const showEmpty = empty && !loading
  if (loading) {
    return (
      <div className={classNames(style.loading, className)}>
        <Spin
          tip={tip}
          delay={delay}
          spinning={loading}
        />
      </div>
    )
  }
  if (showEmpty) {
    return <Empty {...emptyProps} />
  }

  return children
}
