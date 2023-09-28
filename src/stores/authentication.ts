import router from '../router'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from "vue"
import { useSuppliersStore } from "@/stores/suppliers"
import { useQuotesStore } from "@/stores/quotes"

const apiUrl = import.meta.env.VITE_FEB_API_URL

type loginResponseData = {
  token: string
}

type signupResponseData = {
  id: string,
  username: string,
  password: string, // Why??
  first_name: string,
  last_name: string,
  email: string,
  auth_token: string
}

const temporaryErrorHandler = (errorMessage?: string, errorData?: any) => {
  console.error(errorMessage || 'Temporary error, this should be handled by UI elements (i.e. toasts) to properly inform the user.')
  throw new Error(errorData)
}

export const useAuthenticationStore = defineStore('authentication', () => {
  const token = useLocalStorage('auth_token', '')
  const userIsAuthenticated = computed(() => token.value.length > 0)

  async function login (username: string, password: string) {
    const loginResponse = await fetch(`${apiUrl}/api-token-auth/`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!loginResponse.ok) {
      temporaryErrorHandler('Bad Response', loginResponse)
    }

    const loginData: loginResponseData = await loginResponse.json()

    if (!loginData.token) {
      temporaryErrorHandler('Something wrong with loginData JSON', loginData)
    }

    token.value = loginData.token

    await router.push({ name: 'home' })
  }

  async function signup (username: string, password: string, first_name: string, last_name:string, email: string) {
    const signupResponse = await fetch(`${apiUrl}/api/v1/users/`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        first_name,
        last_name,
        email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!signupResponse.ok) {
      temporaryErrorHandler('Bad Response', signupResponse)
    }

    const signupData: signupResponseData = await signupResponse.json()

    if (!signupData.auth_token) {
      temporaryErrorHandler('Something wrong with signupData JSON', signupData)
    }

    token.value = signupData.auth_token

    await router.push({ name: 'home' })
  }

  async function logout () {
    const supplierStore = useSuppliersStore()
    const quotesStore = useQuotesStore()

    token.value = '' // Wipe the token, essentially logs us out because we can't authenticate anymore

    // Clear stores that contain sensitive data, that would normally require the user to be authenticated to view
    supplierStore.clear()
    quotesStore.clear()

    await router.push({name: 'login'})
  }

  return { token, userIsAuthenticated, login, signup, logout }
})