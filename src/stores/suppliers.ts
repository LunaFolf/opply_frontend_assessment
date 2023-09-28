import { useSessionStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useAuthenticationStore } from "@/stores/authentication"

const apiUrl = import.meta.env.VITE_FEB_API_URL

type SupplierData = {
  id: number,
  name: string,
  description: string
}

type SuppliersDataJSON = {
  count: number,
  next: string,
  previous: string,
  results: SupplierData[]
}

const temporaryErrorHandler = (errorMessage?: string, errorData?: any) => {
  console.error(errorMessage || 'Temporary error, this should be handled by UI elements (i.e. toasts) to properly inform the user.')
  throw new Error(errorData)
}

export const useSuppliersStore = defineStore('suppliers', () => {
  const suppliers = useSessionStorage('suppliers', [] as SupplierData[])

  const authStore = useAuthenticationStore()

  async function refreshSuppliers () {
    const suppliersDataResponse = await fetch(`${apiUrl}/api/v1/suppliers/`, {
      headers: {
        'Authorization': `Token ${authStore.token}`
      }
    })

    if (!suppliersDataResponse.ok) temporaryErrorHandler(undefined, suppliersDataResponse)

    const suppliersData: SuppliersDataJSON = await suppliersDataResponse.json()

    suppliers.value = suppliersData.results
  }

  async function getSupplier (searchID: number) {
    const supplierFromCache = suppliers.value.find(supplier => supplier.id === searchID)

    console.log({ supplierFromCache })

    if (supplierFromCache) return (supplierFromCache as SupplierData)

    const supplierResponse = await fetch(`${apiUrl}/api/v1/suppliers/${searchID}`, {
      headers: {
        'Authorization': `Token ${authStore.token}`
      }
    })

    if (!supplierResponse.ok) temporaryErrorHandler(undefined, supplierResponse)

    const supplierData: SupplierData = await supplierResponse.json()

    console.log({ supplierData })

    return supplierData
  }

  function clear() {
    suppliers.value = []
  }

  return { suppliers, refreshSuppliers, getSupplier, clear }
})