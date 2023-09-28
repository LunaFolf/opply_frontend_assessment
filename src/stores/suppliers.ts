import { useSessionStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useAuthenticationStore } from "@/stores/authentication"

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
    const authStore = useAuthenticationStore()

    const suppliersDataResponse = await fetch(`${apiUrl}/api/v1/suppliers/`, {
      headers: {
        'Authorization': `Token ${authStore.token}`
      }
    })

    if (!suppliersDataResponse.ok) temporaryErrorHandler(undefined, suppliersDataResponse)

    const suppliersData = await suppliersDataResponse.json()

    suppliers.value = suppliersData.results
  }

  function clear() {
    suppliers.value = []
  }

  return { suppliers, refreshSuppliers, clear }
})