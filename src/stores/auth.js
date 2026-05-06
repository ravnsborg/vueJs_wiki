import { defineStore } from 'pinia'

import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const entityId = ref(null)

  function setUser() {
    const userData = {
      id: 2,
      name: 'Kevin Ravnsborg',
      preferred_entity_id: 2,
      entity: {
        id: 1,
        title: 'Walks',
        user_id: 2,
        created_at: '2025-12-05T20:30:02.000000Z',
        updated_at: '2025-12-05T20:30:02.000000Z',
      },
    }

    localStorage.setItem('userTestKmr', JSON.stringify(userData))
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
