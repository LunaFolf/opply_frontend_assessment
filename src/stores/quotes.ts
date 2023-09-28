import router from '../router'
import { useSessionStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from "vue"
import { useAuthenticationStore } from "@/stores/authentication"

const authStore = useAuthenticationStore()
const apiUrl = import.meta.env.VITE_FEB_API_URL

type QuoteData = {
  id: number,
  amount: string,
  created: string,
  title: string,
  supplier_id: string // Seams like this should be a number, not a string...
}

const temporaryErrorHandler = (errorMessage?: string, errorData?: any) => {
  console.error(errorMessage || 'Temporary error, this should be handled by UI elements (i.e. toasts) to properly inform the user.')
  throw new Error(errorData)
}

export const useQuotesStore = defineStore('quotes', () => {
  const quotes = useSessionStorage('quotes', [] as QuoteData[])

  async function refreshQuotes () {
    const quotesDataResponse = await fetch(`${apiUrl}/api/v1/quotes/`, {
      headers: {
        'Authorization': `Token ${authStore.token}`
      }
    })

    if (!quotesDataResponse.ok) temporaryErrorHandler(undefined, quotesDataResponse)

    const suppliersData = await quotesDataResponse.json()

    quotes.value = suppliersData.results
  }

  return { quotes, refreshQuotes }
})