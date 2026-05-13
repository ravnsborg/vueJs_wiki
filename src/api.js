import axios from 'axios'
import { isRef, isReactive, toRaw } from 'vue'
import { clearAuthAccess, getUserStorage } from './store/auth'
import router from '@/router/routes.js'
const apiBaseUrl = import.meta.env.VITE_API_ENDPOINT

const client = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Api wrapper
async function apiCall(method, url, data = null) {
  try {
    let payload = data

    if (isRef(payload)) {
      payload = toRaw(payload.value)
    } else if (isReactive(payload)) {
      payload = toRaw(payload)
    }

    const res = await client({
      method,
      url,
      data: payload,
    })
    return { status: res.status, data: res.data }
  } catch (err) {
    if (err.response?.status === 401) {
      clearAuthAccess()
      router.push('/login')
    }
    console.error('Response Error:', err.response?.data)
    throw err
  }
}

// ----------------------
// Auth / User
// ----------------------
export const loginUser = (credentials) => apiCall('post', '/login', credentials)
export const registerUser = (data) => apiCall('post', '/register', data)
export const logoutUser = () => apiCall('get', '/logout')
export const getCurrentUser = () => apiCall('get', '/v1/user')

export const updateUserEntityId = (entityId) => {
  const userId = getUserStorage()?.id
  return apiCall('put', '/v1/users/' + userId + '/entities', { entity_id: entityId })
}

// ----------------------
// Articles
// ----------------------
export const getArticlesByKeyword = (keyword) =>
  apiCall('get', `/v1/articles/search?q=${encodeURIComponent(keyword)}`)

export const getArticlesByCategoryId = (categoryId) =>
  apiCall('get', '/v1/categories/' + categoryId + '/articles')

export const getArticlesByArticleId = (articleId) =>
  apiCall('get', '/v1/articles/' + articleId + '?include=category')

export const getLinks = () => apiCall('get', '/v1/links')

export const getFavorites = () => apiCall('get', '/v1/articles/favorites')

export const updateArticle = (data) => {
  const articleId = data.id
  return apiCall('put', `/v1/articles/${articleId}?include=category`, data)
}

// ----------------------
// Categories
// ----------------------
export const getCategories = () => apiCall('get', '/v1/categories')
export const newCategory = (data) => apiCall('post', '/v1/categories', data)

// ----------------------
// Entities
// ----------------------
export const getEntities = () => apiCall('get', '/v1/entities')
export const newEntity = (data) => apiCall('post', '/v1/entities', data)
