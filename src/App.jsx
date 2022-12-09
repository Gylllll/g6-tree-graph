import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Icon } from 'fish-h5'
import { Switch, AsyncRoute } from '@/util/route'
import BackTop from './component/BackTop'

import './asset/style/index.less'

Icon.url = '/fish-h5/icon/umd-1.2.1.js'

function App() {
  useEffect(() => {
    document.title = '国家中小学智慧教育平台'
  }, [])

  return (
    <BrowserRouter>
      <div className="main">
        <BackTop />
        <Switch>
          <AsyncRoute
            path="/"
            module={() => import('@/page')}
          />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
