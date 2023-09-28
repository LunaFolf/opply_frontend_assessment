import {createRouter, createWebHistory } from 'vue-router'
import { useAuthenticationStore } from "@/stores/authentication"

import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const beforeEnter = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const authStore = useAuthenticationStore()

  if (authStore.token) next()
  else next({ name: 'login' })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router
