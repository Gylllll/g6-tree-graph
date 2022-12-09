import { useHistory } from 'react-router-dom'

const smartcan = window.Bridge && window.navigator.userAgent.indexOf('SmartCanWebView') !== -1

// function getQueryVariable(variable, path) {
//   const vars = path.split('&')
//   for (let i = 0; i < vars.length; i++) {
//     const pair = vars[i].split('=')
//     if (pair[0] === variable) {
//       return pair[1]
//     }
//   }
//   return null
// }

export default function useGoToPage() {
  const history = useHistory()
  return async (subPath, {
    useBridge,
    newPage
  } = {}) => {
    if (smartcan && (useBridge || window.location.pathname === '/')) {
      let targetPath
      if (subPath.indexOf('http') === 0) {
        targetPath = subPath
      } else if (subPath.substr(0, 1) === '/') {
        targetPath = `${window.location.origin}${subPath}`
      } else {
        targetPath = `${window.location.href}${subPath.substr(1)}`
      }
      // const title = getQueryVariable('_maf_webview_title', targetPath) || '智慧中小学'
      targetPath = addQuery(targetPath, {
        _maf_menu_ids: getMenuIds(subPath),
        _maf_show_progress_bar: false,
        _maf_need_decode: true
      })
      const appfactory = window.Bridge.require('sdp.appfactory').promise()
      const result = await appfactory.goPage({
        page: targetPath
      })
      return result
    } else if (newPage) {
      window.open(subPath, '_blank')
    } else if (subPath.indexOf('http') === 0) {
      window.location.href = subPath
    } else {
      const [
        pathname,
        search
      ] = subPath.split('?')
      history.push({
        pathname,
        search: search && `?${search}`
      })
    }
  }
}

const ShowIdsSubPath = [
  '/teacherTraining?firstLevel=t_type_M52vKqPtOQ'
]

function getMenuIds(subPath) {
  const needMenu = ShowIdsSubPath.some((t) => subPath.indexOf(t) === 0)
  return needMenu ? 'all' : 'none'
}

export function addQuery(url, params) {
  const paramStr = Object.keys(params).map((key) => {
    const value = params[key]
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  }).join('&')
  return url.indexOf('?') > 0
    ? `${url}&${paramStr}`
    : `${url}?${paramStr}`
}
