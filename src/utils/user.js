import Cookies from 'js-cookie'
/*入驻登录状态，登录名*/
const TokenKey = 'isLogin'

const TokenLoginName = 'loginName'

export function getIsLogin () {
  return Cookies.get(TokenKey)
}

export function setIsLogin (token) {
  return Cookies.set(TokenKey, token)
}

export function removeIsLogin () {
  return Cookies.remove(TokenKey)
}

export function getLoginName () {
  return Cookies.get(TokenLoginName)
}

export function setLoginName (token) {
  return Cookies.set(TokenLoginName, token)
}

export function removeLoginName () {
  return Cookies.remove(TokenLoginName)
}
/*融资登录状态，登录名*/
const TokenKeyFinance = 'isLoginFinance'

const TokenLoginNameFinance = 'loginNameFinance'

export function getIsLoginFinance () {
  return Cookies.get(TokenKeyFinance)
}

export function setIsLoginFinance (token) {
  return Cookies.set(TokenKeyFinance, token)
}

export function removeIsLoginFinance () {
  return Cookies.remove(TokenKeyFinance)
}

export function getLoginNameFinance () {
  return Cookies.get(TokenLoginNameFinance)
}

export function setLoginNameFinance (token) {
  return Cookies.set(TokenLoginNameFinance, token)
}

export function removeLoginNameFinance () {
  return Cookies.remove(TokenLoginNameFinance)
}