<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
      <form @submit.prevent="login" class="space-y-4">
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
        <button
          type="submit"
          :disabled="isLoggingIn"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoggingIn ? 'Logging in...' : 'Login' }}
        </button>
        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
      </form>
      <router-link
        to="/signup"
        class="block text-center text-blue-600 hover:underline text-sm mt-4"
      >
        Create Account
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { loginUser } from '@/api'
import { useRouter } from 'vue-router'
import { setAuthAccess } from '@/store/auth'
const router = useRouter()

const isLoggingIn = ref(false)
const error = ref('')

const form = reactive({
  email: '',
  password: '',
})

async function login() {
  try {
    isLoggingIn.value = true
    error.value = ''
    const { data } = await loginUser(form)

    setAuthAccess(data.access_token, data.user)
    isLoggingIn.value = false
    router.push('/')
  } catch (e) {
    console.log('Exception on login: ', e)
    error.value = 'Invalid email or password.'
  }
  isLoggingIn.value = false
}
</script>
