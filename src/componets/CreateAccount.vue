<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Account</h2>
      <form @submit.prevent="createAccount" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            v-model="form.name"
            type="name"
            required
            placeholder=""
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            placeholder="you@example.com"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="form.password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            v-model="form.password_confirmation"
            type="password"
            required
            placeholder="••••••••"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          :disabled="isCreatingAccount"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isCreatingAccount ? 'Creating account...' : 'Create Account' }}
        </button>
        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
      </form>
      <router-link to="/login" class="block text-center text-blue-600 hover:underline text-sm mt-4">
        Login
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { registerUser } from '@/api'
import { useRouter } from 'vue-router'
const router = useRouter()

const isCreatingAccount = ref(false)
const error = ref('')
const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

async function createAccount() {
  try {
    isCreatingAccount.value = true
    error.value = ''
    if (form.password !== form.password_confirmation) {
      error.value = 'Passwords must match'
      isCreatingAccount.value = false
    }

    await registerUser(form)
    isCreatingAccount.value = false
    router.push('/login')
  } catch (e) {
    console.log('Exception occurred: ', e)
    error.value = e.response?.data?.message
  }
  isCreatingAccount.value = false
}
</script>
