export function isFunction(v) {
  return typeof v === 'function'
}

export function isIE() {
  return /msie|trident/.test(window.navigator.userAgent.toLowerCase())
}

export const osType = {
  Mac: 'Mac OS',
  iOS: 'iOS',
  Windows: 'Windows',
  Android: 'Android',
  Linux: 'Linux',
  TV: 'TV'
}

export function getOS() {
  const { userAgent } = window.navigator
  const { platform } = window.navigator
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']
  let os = null

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = [osType.Mac, 4]
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = [osType.iOS, 4]
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = [osType.Windows, 0]
  } else if (/Android/.test(userAgent)) {
    os = [osType.Android, 1]
  } else if (!os && /Linux/.test(platform)) {
    os = [osType.Linux, 1]
  } else if (/WebTV/.test(platform)) {
    os = [osType.TV, 3]
  }

  return os
}

// 判断是否移动端
export function isMobile() {
  const platform = getOS()[0]
  if (platform === osType.Android || platform === osType.iOS) {
    return true
  } else {
    return false
  }
}
