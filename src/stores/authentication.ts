import router from '../router'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from "vue"

const temporaryErrorHandler = (errorMessage?: string, errorData?: any) => {
  console.error(errorMessage || 'Temporary error, this should be handled by UI elements (i.e. toasts) to properly inform the user.')
  throw new Error(errorData)
}

export const useAuthenticationStore = defineStore('authentication', () => {
  const token = useLocalStorage('auth_token', '')
  const userIsAuthenticated = computed(() => token.value.length > 0)

  const apiUrl = import.meta.env.VITE_FEB_API_URL
  async function login (username: string, password: string) {
    const authenticationResponse = await fetch(`${apiUrl}/api-token-auth/`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!authenticationResponse.ok) {
      temporaryErrorHandler('Bad Response', authenticationResponse)
    }

    const authenticationData: { ["token"]: string } = await authenticationResponse.json()

    if (!authenticationData.token) {
      temporaryErrorHandler('Something wrong with authenticationData JSON', authenticationData)
    }

    token.value = authenticationData.token

    await router.push({ name: 'home' })
  }

  async function logout () {
    token.value = ''

    await router.push({name: 'login'})
  }

  return { token, userIsAuthenticated, login, logout }
})