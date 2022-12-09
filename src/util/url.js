import queryString from 'query-string'

/* 获取 url query 参数
 * 在 hash 模式下，如果 query 在 hash 后面 location.query 拿不到值
 * 因此通过 location.href 来获取
 */
export function getUrlQuery(url) {
  const query = (url ?? window.location.href).split('?')
  if (query.length > 1) {
    let params = {}
    query.slice(1).forEach((item) => {
      let parseString = item
      if (item.indexOf('#') > -1) {
        parseString = item.split(/\/?#/)[0]
      }
      params = {
        ...queryString.parse(parseString),
        ...params
      }
    })
    return params
  }
  return {}
}

export function pathJoin(...args) {
  return args.join('/').replace(/\/{2,}/g, '/')
}

export function queryJoin(url, query) {
  return `${url}${url.indexOf('?') === -1 ? '?' : '&'}${queryString.stringify(query)}`
}
