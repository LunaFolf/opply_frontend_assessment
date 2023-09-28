<script setup lang="ts">
import { useQuotesStore } from "@/stores/quotes"
import ModelGrid from "@/components/ModelGrid.vue";
const quotesStore = useQuotesStore()

quotesStore.refreshQuotes()
</script>

<template>
  <model-grid
    :schema="['id', 'amount', 'title', 'created', 'supplier_id']"
    :data="quotesStore.quotes"
  />
</template>