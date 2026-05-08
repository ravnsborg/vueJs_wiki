import { defineStore } from 'pinia'
import { login, getCurrentUser } from '@/api'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const entityId = ref(null)

  async function setUser() {
    // **************************************************************
    // Temporary to login for now to get access token generated
    // **************************************************************
    const { status, data } = await login({
      email: 'ravnsborg@gmail.com',
      password: 'tanner55',
    })
    console.log('....................')
    console.log(status)
    if (status === 200) {
      localStorage.setItem('accessToken', data.access_token)

      const { data: userData1 } = await getCurrentUser()
      console.log(userData1)
      localStorage.setItem('userTestKmr', JSON.stringify(userData1.user))
    } else {
      localStorage.removeItem('accessToken')
    }
  }

  function getUser() {
    const data = localStorage.getItem('userTestKmr')
    user.value = JSON.parse(data)
    return user.value
  }

  function getUserEntityId() {
    const data = localStorage.getItem('userTestKmr')
    entityId.value = JSON.parse(data).preferred_entity_id
    return entityId.value
  }

  return {
    setUser,
    getUser,
    getUserEntityId,
    user,
    entityId,
  }
})
