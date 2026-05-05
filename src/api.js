import axios from 'axios'

export const API_URL = 'http://127.0.0.1:8000/api' //import.meta.env.VITE_API_URL
export const API_KEY = 'keyNotUsed' //import.meta.env.VITE_API_KEY

const client = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
})

// Api wrapper
async function apiCall(method, url, data = null) {
  try {
    const res = await client({ method, url, data })
    return res.data
  } catch (err) {
    console.log(err.response?.data?.message)
    console.log(err.response?.status)
    throw err // re-throw so the caller can handle it if needed
  }
}

// Api calls
export const getArticlesByKeyword = (keyword) =>
  apiCall('get', `/v1/articles/search?q=${encodeURIComponent(keyword)}`)

export const getArticlesByCategoryId = (categoryId) =>
  apiCall('get', '/v1/categories/' + categoryId + '/articles')

export const getArticlesByArticleId = (articleId) =>
  apiCall('get', '/v1/articles/' + articleId + '?include=category')

export const getLinks = () => apiCall('get', '/v1/links')

export const getCategories = () => apiCall('get', '/v1/categories')

export const getFavorites = () => apiCall('get', '/v1/articles/favorites')
