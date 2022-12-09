/* eslint-disable global-require */
import React from 'react'
import { Spin } from 'fish'

import './index.less'

export default function WebLoading({
  loading,
  delay = 1500
}) {
  const indicator = <img src={require('./img/loading.gif')} alt="loading" />
  return (
    <Spin
      tip="正在努力加载中…"
      delay={delay}
      indicator={indicator}
      spinning={loading}
      className="x-edu-loading"
    />
  )
}
