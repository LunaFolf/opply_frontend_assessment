<script setup lang="ts">
import { useSuppliersStore } from "@/stores/suppliers"
import ModelGrid from "@/components/ModelGrid.vue";
import { useRouter } from "vue-router"

const router = useRouter()
const suppliersStore = useSuppliersStore()

suppliersStore.refreshSuppliers()

const handleClick = (event: { type: string, item?: any, fieldName?: string }) => {
  const { type, item, fieldName } = event

  if (!item) return

  router.push({ name: 'supplierDetail', params: { id: item.id } })
}
</script>

<template>
  <model-grid
    :schema="['id', 'name', 'description']"
    :data="suppliersStore.suppliers"
    @touch="handleClick"
  />
</template>