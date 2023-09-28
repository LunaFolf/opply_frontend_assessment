<script setup lang="ts">
import { useSuppliersStore } from "@/stores/suppliers"
const suppliersStore = useSuppliersStore()

const supplier = await suppliersStore.getSupplier(10)
</script>

<template>
  <div class="grid">
    <div class="supplier__name">{{ supplier.name }}</div>
    <div class="supplier__description">{{ supplier.description }}</div>
  </div>
</template>

<style>
.grid {
  display: grid;
  background-color: var(--color-background-soft);
  padding: .5rem .25rem;
  gap: 1rem;
}

.supplier__name {
  font-size: 3.5rem;
  line-height: 3.5rem;
}

.supplier__description {
  font-size: 1.5rem;
}
</style>