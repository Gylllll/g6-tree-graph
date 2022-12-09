import React, { useEffect, useState } from 'react'
import useGoToPage from '@/hook/useGoToPage'
import { Radio } from 'fish'
import { useLocation, useRouteMatch } from 'react-router'
import style from './index.module.less'

export const NavConfig = [
  {
    title: '只展开一级节点，其他收起',
    link: '/collapse'
  },
  {
    title: '全展开模式',
    link: '/expand'
  },
  {
    title: '自定义子节点显示（subTreeRender）',
    link: '/complex'
  }
]

export default function Nav() {
  const goToPage = useGoToPage()
  const {
    pathname
  } = useLocation()
  const {
    url
  } = useRouteMatch()

  const [current, setCurrent] = useState(NavConfig[0])

  useEffect(() => {
    const cur = pathname === url ? NavConfig[0] : NavConfig.find((_) => _.link === pathname)
    setCurrent(cur)
  }, [pathname])

  const handleRadioClick = (item) => {
    goToPage(item.link)
  }

  return (
    <div className={style.header}>
      <Radio.Group
        value={current}
        onChange={(e) => {
          handleRadioClick(e.target.value)
        }}
      >
        {NavConfig.map((item, index) => (
          <Radio.Button
            key={`${index.toString()}`}
            value={item}
          >
            {item.title}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  )
}
