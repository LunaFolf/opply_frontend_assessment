<script setup lang="ts">
import { useSuppliersStore } from "@/stores/suppliers"
const suppliersStore = useSuppliersStore()

suppliersStore.refreshSuppliers()
</script>

<template>
  <table>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Description</th>
    </tr>
    <tr v-for="supplier in suppliersStore.suppliers" :key="supplier.id">
      <td>{{ supplier.id }}</td>
      <td>{{ supplier.name }}</td>
      <td>{{ supplier.description }}</td>
    </tr>
  </table>
</template>