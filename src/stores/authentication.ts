import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

const temporaryErrorHandler = (errorMessage?: string, errorData?: any) => {
  console.error(errorMessage || 'Temporary error, this should be handled by UI elements (i.e. toasts) to properly inform the user.')
  throw new Error(errorData)
}

export const useAuthenticationStore = defineStore('authentication', () => {
  const token = useLocalStorage('auth_token', '')

  async function login (username: string, password: string) {
    // TODO: Move API URL to .env
    const authenticationResponse = await fetch('https://february-21.herokuapp.com/api-token-auth/', {
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

    token.value =  authenticationData.token
  }

  return { token, login }
})