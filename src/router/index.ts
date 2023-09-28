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
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/suppliers',
      name: 'suppliers',
      component: () => import('../views/Suppliers/IndexView.vue'),
      beforeEnter
    },
    {
      path: '/suppliers/:id',
      name: 'supplierDetail',
      component: () => import('../views/Suppliers/DetailView.vue'),
      beforeEnter
    },
    {
      path: '/quotes',
      name: 'quotes',
      component: () => import('../views/Quotes/IndexView.vue'),
      beforeEnter
    }
  ]
})

export default router
