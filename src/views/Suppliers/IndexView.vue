<script setup lang="ts">
import { useSuppliersStore } from "@/stores/suppliers"
import ModelGrid from "@/components/ModelGrid.vue";

const suppliersStore = useSuppliersStore()

suppliersStore.refreshSuppliers()
</script>

<template>
  <model-grid
    :schema="['id', 'name', 'description']"
    :data="suppliersStore.suppliers"
  />
</template>