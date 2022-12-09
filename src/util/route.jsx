import React, { useCallback, useMemo } from 'react'
import {
  Route as PureRoute,
  Switch as PureSwitch,
  useHistory,
  useLocation
} from 'react-router-dom'
import Loading from '@/component/status/Loading'
import PageNotFound from '@/component/status/404/index'
import WebLoading from '@/component/status/WebLoading'
import { pathJoin } from './url'

/**
 * 异步路由，接受 module 参数，格式 () => import(...)
 * 传给 Route
 *    component：给没有 permission 时使用，直接给 PureRoute
 *    module：给有 permission 时使用
 *      permission 返回 true 时，加载 module
 *      permission 返回 组件 时，显示对应的组件，常使用 Redirect 组件进行跳转
 */
const ReloadCacheKey = '__load_chunk_fail_stack'

export function AsyncRoute({ module: loadModule, ...rest }) {
  const {
    pathname,
    search
  } = useLocation()

  if (pathname.indexOf('bigScreen') > -1) {
    document.body.classList.add('big-screen')
  } else {
    document.body.classList.remove('big-screen')
  }

  const module = useCallback(
    () => loadModule().catch((t) => {
      console.error(t)
      const cacheStack = window.localStorage.getItem(ReloadCacheKey)
      if (!cacheStack || cacheStack !== t.stack) {
        window.localStorage.setItem(ReloadCacheKey, t.stack)
        window.location.reload()
      }
    }), [rest.path]
  )

  const content = useMemo(() => (
    <Route {...rest} component={React.lazy(module)} module={module} />
  ), [module, pathname, search])

  return (
    <React.Suspense fallback={pathname.indexOf('bigScreen') ? <WebLoading /> : <Loading />}>
      {content}
    </React.Suspense>
  )
}

export function Route({ permission, path, ...rest }) {
  const history = useHistory()

  if (typeof permission === 'function') {
    const result = permission({
      history,
      ...rest
    })
    if (result) {
      if (typeof result.then === 'function') {
        return (
          <PureRoute
            path={path}
            component={
              React.lazy(() => result.then((t) => {
                if (t === true) {
                  return rest.module()
                }
                // permission 存在返回值，要求必须是一个组件
                return {
                  default: () => t
                }
              }))
            }
          />
        )
      }
      return <PureRoute path={path} component={() => result} />
    }
  }
  return (
    <PureRoute {...rest} />
  )
}

export function Switch({ prefix = '', children }) {
  return (
    <>
      <PureSwitch>
        {children}
        <PureRoute path={pathJoin(prefix, '*')}>
          <PageNotFound />
        </PureRoute>
      </PureSwitch>
    </>
  )
}
