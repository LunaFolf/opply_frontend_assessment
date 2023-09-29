<script setup lang="ts">
import { useSuppliersStore } from "@/stores/suppliers"
import ModelGrid from "@/components/ModelGrid.vue";
import { useRouter } from "vue-router"
import {ref} from "vue";

const router = useRouter()
const suppliersStore = useSuppliersStore()

let suppliers = ref([] as any[])
let currentPage = ref(1)
let totalPages = ref(1)

async function loadPage (page: number = 1) {
  const suppliersData: { data: any[], currentPage: number, totalPages: number } = await suppliersStore.refreshSuppliers(page)
  suppliers.value = suppliersData.data
  currentPage.value = suppliersData.currentPage
  totalPages.value = suppliersData.totalPages
}

const handleClick = (event: { type: string, item?: any, fieldName?: string }) => {
  const { item } = event

  if (!item) return

  router.push({ name: 'supplierDetail', params: { id: item.id } })
}

await loadPage()
</script>

<template>
  <model-grid
    :schema="['id', 'name', 'description']"
    :data="suppliers"
    @touch="handleClick"
  />

  <div class="row">
    <button @click="loadPage(currentPage - 1)" :disabled="currentPage <= 1">&lt;</button>
    <input readonly :value="`${currentPage} / ${totalPages}`" />
    <button @click="loadPage(currentPage + 1)" :disabled="currentPage >= totalPages">&gt;</button>
  </div>
</template>