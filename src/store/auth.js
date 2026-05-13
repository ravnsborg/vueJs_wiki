import { logoutUser } from '@/api.js'
import router from '@/router/routes.js'

export async function userLogout() {
  try {
    await logoutUser()
  } catch (e) {
    console.log('Exception on logout: ', e)
  }
  clearAuthAccess()
  router.push('/login')
}

export function clearAuthAccess() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('user')
}

export function getUserStorage() {
  return JSON.parse(localStorage.getItem('user'))
}
export async function setAuthAccess(accessToken, userInfo) {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('user', JSON.stringify(userInfo))
  localStorage.setItem('entity', JSON.stringify(userInfo.entity))
  router.push('/')
}

export function getEntityStorage() {
  return JSON.parse(localStorage.getItem('entity'))
}

export async function setEntityStorage(entity) {
  localStorage.setItem('entity', JSON.stringify(entity))
  router.push('/')
}
