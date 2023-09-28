<script setup lang="ts">
import { useQuotesStore } from "@/stores/quotes"
const quotesStore = useQuotesStore()

quotesStore.refreshQuotes()
</script>

<template>
  <table>
    <tr>
      <th>ID</th>
      <th>Amount</th>
      <th>Title</th>
      <th>Created</th>
      <th>Supplier ID</th>
    </tr>
    <tr v-for="quote in quotesStore.quotes" :key="quote.id">
      <td>{{ quote.id }}</td>
      <td>{{ quote.amount }}</td>
      <td>{{ quote.title }}</td>
      <td>{{ quote.created }}</td>
      <td>{{ quote.supplier_id }}</td>
    </tr>
  </table>
</template>