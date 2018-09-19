import Cookies from 'universal-cookie'
import _get from 'lodash/get'
export const isBrowser = typeof window !== 'undefined'

/*
  Set language by user from client side
*/
const cookies = new Cookies()
export const setLanguage = lang => {
  cookies.set('LANGUAGE', lang)
  window.location.reload()
}

export const getLanguage = () => {
  // language first time loaded
  const defaultLang = cookies.get('LANGUAGE') || _get(window, ['navigator', 'userLanguage']) || _get(window, ['navigator', 'language'], '')

  switch (defaultLang.toLowerCase()) {
    case 'zh-cn':
      return 'zh-cn'
    case 'zh-tw':
    case 'zh-hk':
      return 'zh-hk'
    case 'en':
    default:
      return 'en'
  }
}

export const isValidCovenantAddress = addr => {
  const pattern = /^4[a-zA-Z0-9]{50}$/
  let valid = false
  if (addr) {
    valid = pattern.test(addr)
  }
  return valid
}

export const isValidURL = url => {
  const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  let valid = false
  if (url) {
    valid = pattern.test(url)
  }
  return valid
}
