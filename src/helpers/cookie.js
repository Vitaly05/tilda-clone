export function setCookie(name, value, expiresTime) {
  var date = new Date()
  date.setTime(date.getTime() + expiresTime)
  const expires = '; expires=' + date.toUTCString()
  document.cookie = `${name}=${value}; expires=${expires}; path=/`

  if (expiresTime > 0) {
    setTimeout(() => {
      removeCookie(name)
    }, expiresTime)
  }
}

export function getCookie(name) {
  const nameEquals = name + '='
  const allCookies = document.cookie.split(';')
  for (var i = 0; i < allCookies.length; i++) {
    const cookie = allCookies[i].trim()
    if (cookie.indexOf(nameEquals) == 0) {
      return cookie.substring(nameEquals.length, cookie.length)
    }
  }
  return null
}

export function removeCookie(name) {
  setCookie(name, '', 0)
}
