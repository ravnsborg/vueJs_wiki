import Home from '@/componets/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/componets/LoginPage.vue'
import CreateAccount from '@/componets/CreateAccount.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home, meta: { requiresAuth: true } },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/signup', name: 'Create Account', component: CreateAccount, meta: { guest: true } },
  ],
})

router.beforeEach((to) => {
  const isLoggedIn = !!localStorage.getItem('accessToken')

  if (to.meta.requiresAuth && !isLoggedIn) {
    return { path: '/login' }
  }

  if (to.path === '/login' && isLoggedIn) {
    return { path: '/' }
  }

  // already logged in, trying to access guest-only route
  if (to.meta.guest && isLoggedIn) {
    return { path: '/' }
  }
})

export default router
