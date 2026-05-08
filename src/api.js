import axios from 'axios'
import { isRef, isReactive, toRaw } from 'vue'

const apiBaseUrl = import.meta.env.VITE_API_ENDPOINT
// const apiAccessToken = localStorage.getItem('accessToken')

const client = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json',
  },
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
    console.error('Response Error:', err.response?.data)
    throw err
  }
}

export const login = (credentials) => apiCall('post', '/login', credentials)

export const getCurrentUser = () => apiCall('get', '/v1/user')

export const getArticlesByKeyword = (keyword) =>
  apiCall('get', `/v1/articles/search?q=${encodeURIComponent(keyword)}`)

export const getArticlesByCategoryId = (categoryId) =>
  apiCall('get', '/v1/categories/' + categoryId + '/articles')

export const getArticlesByArticleId = (articleId) =>
  apiCall('get', '/v1/articles/' + articleId + '?include=category')

export const getLinks = () => apiCall('get', '/v1/links')

export const getCategories = () => apiCall('get', '/v1/categories')

export const getEntities = () => apiCall('get', '/v1/entities')

export const getFavorites = () => apiCall('get', '/v1/articles/favorites')

export const updateArticle = (data) => {
  const articleId = data.id
  delete data.id
  return apiCall('put', `/v1/articles/${articleId}?include=category`, data)
}
