import router from '../router'
import { useSessionStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from "vue"
import { useAuthenticationStore } from "@/stores/authentication"

const authStore = useAuthenticationStore()
const apiUrl = import.meta.env.VITE_FEB_API_URL

type SupplierData = {
  id: number,
  name: string,
  description: string
}

const temporaryErrorHandler = (errorMessage?: string, errorData?: any) => {
  console.error(errorMessage || 'Temporary error, this should be handled by UI elements (i.e. toasts) to properly inform the user.')
  throw new Error(errorData)
}

export const useSuppliersStore = defineStore('suppliers', () => {
  const suppliers = useSessionStorage('suppliers', [] as SupplierData[])

  async function refreshSuppliers () {
    const suppliersDataResponse = await fetch(`${apiUrl}/api/v1/suppliers/`, {
      headers: {
        'Authorization': `Token ${authStore.token}`
      }
    })

    if (!suppliersDataResponse.ok) temporaryErrorHandler(undefined, suppliersDataResponse)

    const suppliersData = await suppliersDataResponse.json()

    suppliers.value = suppliersData.results
  }

  return { suppliers, refreshSuppliers }
})